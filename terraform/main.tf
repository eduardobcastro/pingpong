variable "POSTGRES_USER" {
  type = string
  description = "The PostgreSQL user to connect as"
  nullable = false
}

variable "POSTGRES_PASSWORD" {
  type = string
  description = "The PostgreSQL user's password"
  sensitive = true
  nullable = false
}

variable "POSTGRES_DB" {
  type = string
  description = "The PostgreSQL default database"
  nullable = false
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "pingpong" {
  cidr_block = "192.168.0.0/16"
  tags = {
    Name = "pingpong-vpc"
  }
}

resource "aws_subnet" "pingpong" {
  vpc_id = "${aws_vpc.pingpong.id}"
  cidr_block = "192.168.10.0/24"
  map_public_ip_on_launch = true
  tags = {
    Name = "pingpong-sg"
  }
}

resource "aws_internet_gateway" "pingpong" {
  vpc_id = aws_vpc.pingpong.id
  tags  = {
    "Name" = "pingpong-igw"
  }
}

resource "aws_route_table" "pingpong" {
  vpc_id  = aws_vpc.pingpong.id
  route  {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.pingpong.id
  }
  tags = {
    "Name" = "pingpong-rt"
  }
}

resource "aws_route_table_association" "pingpong" {
  route_table_id = aws_route_table.pingpong.id
  subnet_id = aws_subnet.pingpong.id
}

resource "aws_security_group" "pingpong" {
  name = "pingpong-sg"
  description = "Ping Pong SG"
  vpc_id = "${aws_vpc.pingpong.id}"

  // To Allow SSH Transport
  ingress {
    from_port = 22
    protocol = "tcp"
    to_port = 22
    cidr_blocks = ["0.0.0.0/0"]
  }

  // To Allow Postgres Transport
  ingress {
    from_port = 5432
    protocol = "tcp"
    to_port = 5432
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_key_pair" "pingpong" {
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_instance" "pingpong" {
  ami = "ami-07d02ee1eeb0c996c"
  instance_type = "t2.nano"
  user_data = templatefile("init.sh", {
    "POSTGRES_USER" = "${var.POSTGRES_USER}"
    "POSTGRES_PASSWORD" = "${var.POSTGRES_PASSWORD}"
    "POSTGRES_DB" = "${var.POSTGRES_DB}"
  })
  subnet_id = "${aws_subnet.pingpong.id}"
  associate_public_ip_address = true
  key_name = "${aws_key_pair.pingpong.key_name}"

  vpc_security_group_ids = [
    aws_security_group.pingpong.id,
  ]
  root_block_device {
    delete_on_termination = true
    volume_size = 8
    volume_type = "gp2"
  }
  tags = {
    Name = "pingpong-instance"
  }

  depends_on = [ aws_security_group.pingpong ]
}

output "ec2instance" {
  value = aws_instance.pingpong.public_ip
}
