# Requirements
- aws cli
- terraform
- node 14x
- serverless
# Make sure you have access to AWS
```
$ aws configure
```
# Introduction
Instead of using RDS, we use a combination of EC2 and docker to run the database (cheaper). Also we may reuse the same solution for other stuffs like redis, mongodb, etc. Terraform is used to create that. A t2.nano EC2 instance is used.
Serverless framework is used to deploy the lambda function which responds to graphql requests.
When deployment is finished you can access the graphql playground at `https://??????.execute-api.us-east-1.amazonaws.com/graphql` (check serverless output)
> The first time you call the graphql endpoint, you will see errors like `relation "Users" does not exist` because the database is not yet created. Try again in a few seconds.

> Your personal public key is used to access the EC2 instance. It is expected to be in the `~/.ssh/id_rsa.pub` file.
# Testing
```bash
npm test
```
# To do
- [ ] Unit tests
# Quick deploy
```bash
$ git clone git@github.com:eduardobcastro/pingpong.git
Cloning into 'pingpong'...
X11 forwarding request failed on channel 0
remote: Enumerating objects: 28, done.
remote: Counting objects: 100% (28/28), done.
remote: Compressing objects: 100% (25/25), done.
remote: Total 28 (delta 0), reused 28 (delta 0), pack-reused 0
Receiving objects: 100% (28/28), 9.57 KiB | 2.39 MiB/s, done.
$ cd pingpong/terraform
$ terraform init

Initializing the backend...

Initializing provider plugins...
- Reusing previous version of hashicorp/aws from the dependency lock file
- Installing hashicorp/aws v4.11.0...
- Installed hashicorp/aws v4.11.0 (signed by HashiCorp)

Terraform has been successfully initialized!

You may now begin working with Terraform. Try running "terraform plan" to see
any changes that are required for your infrastructure. All Terraform commands
should now work.

If you ever set or change modules or backend configuration for Terraform,
rerun this command to reinitialize your working directory. If you forget, other
commands will detect it and remind you to do so if necessary.
$ export TF_VAR_POSTGRES_USER=pingpong
$ export TF_VAR_POSTGRES_PASSWORD=mystrongpassword
$ export TF_VAR_POSTGRES_DB=pingpong
$ terraform apply

Terraform used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_instance.pingpong will be created
  + resource "aws_instance" "pingpong" {
      + ami                                  = "ami-07d02ee1eeb0c996c"
      + arn                                  = (known after apply)
      + associate_public_ip_address          = true
      + availability_zone                    = (known after apply)
      + cpu_core_count                       = (known after apply)
      + cpu_threads_per_core                 = (known after apply)
      + disable_api_termination              = (known after apply)
      + ebs_optimized                        = (known after apply)
      + get_password_data                    = false
      + host_id                              = (known after apply)
      + id                                   = (known after apply)
      + instance_initiated_shutdown_behavior = (known after apply)
      + instance_state                       = (known after apply)
      + instance_type                        = "t2.nano"
      + ipv6_address_count                   = (known after apply)
      + ipv6_addresses                       = (known after apply)
      + key_name                             = (known after apply)
      + monitoring                           = (known after apply)
      + outpost_arn                          = (known after apply)
      + password_data                        = (known after apply)
      + placement_group                      = (known after apply)
      + placement_partition_number           = (known after apply)
      + primary_network_interface_id         = (known after apply)
      + private_dns                          = (known after apply)
      + private_ip                           = (known after apply)
      + public_dns                           = (known after apply)
      + public_ip                            = (known after apply)
      + secondary_private_ips                = (known after apply)
      + security_groups                      = (known after apply)
      + source_dest_check                    = true
      + subnet_id                            = (known after apply)
      + tags                                 = {
          + "Name" = "pingpong-instance"
        }
      + tags_all                             = {
          + "Name" = "pingpong-instance"
        }
      + tenancy                              = (known after apply)
      + user_data                            = (sensitive)
      + user_data_base64                     = (known after apply)
      + user_data_replace_on_change          = false
      + vpc_security_group_ids               = (known after apply)

      + capacity_reservation_specification {
          + capacity_reservation_preference = (known after apply)

          + capacity_reservation_target {
              + capacity_reservation_id                 = (known after apply)
              + capacity_reservation_resource_group_arn = (known after apply)
            }
        }

      + ebs_block_device {
          + delete_on_termination = (known after apply)
          + device_name           = (known after apply)
          + encrypted             = (known after apply)
          + iops                  = (known after apply)
          + kms_key_id            = (known after apply)
          + snapshot_id           = (known after apply)
          + tags                  = (known after apply)
          + throughput            = (known after apply)
          + volume_id             = (known after apply)
          + volume_size           = (known after apply)
          + volume_type           = (known after apply)
        }

      + enclave_options {
          + enabled = (known after apply)
        }

      + ephemeral_block_device {
          + device_name  = (known after apply)
          + no_device    = (known after apply)
          + virtual_name = (known after apply)
        }

      + metadata_options {
          + http_endpoint               = (known after apply)
          + http_put_response_hop_limit = (known after apply)
          + http_tokens                 = (known after apply)
          + instance_metadata_tags      = (known after apply)
        }

      + network_interface {
          + delete_on_termination = (known after apply)
          + device_index          = (known after apply)
          + network_card_index    = (known after apply)
          + network_interface_id  = (known after apply)
        }

      + root_block_device {
          + delete_on_termination = true
          + device_name           = (known after apply)
          + encrypted             = (known after apply)
          + iops                  = (known after apply)
          + kms_key_id            = (known after apply)
          + throughput            = (known after apply)
          + volume_id             = (known after apply)
          + volume_size           = 8
          + volume_type           = "gp2"
        }
    }

  # aws_internet_gateway.pingpong will be created
  + resource "aws_internet_gateway" "pingpong" {
      + arn      = (known after apply)
      + id       = (known after apply)
      + owner_id = (known after apply)
      + tags     = {
          + "Name" = "pingpong-igw"
        }
      + tags_all = {
          + "Name" = "pingpong-igw"
        }
      + vpc_id   = (known after apply)
    }

  # aws_key_pair.pingpong will be created
  + resource "aws_key_pair" "pingpong" {
      + arn             = (known after apply)
      + fingerprint     = (known after apply)
      + id              = (known after apply)
      + key_name        = (known after apply)
      + key_name_prefix = (known after apply)
      + key_pair_id     = (known after apply)
      + public_key      = "ssh-rsa ????????????????? eduardo"
      + tags_all        = (known after apply)
    }

  # aws_route_table.pingpong will be created
  + resource "aws_route_table" "pingpong" {
      + arn              = (known after apply)
      + id               = (known after apply)
      + owner_id         = (known after apply)
      + propagating_vgws = (known after apply)
      + route            = [
          + {
              + carrier_gateway_id         = ""
              + cidr_block                 = "0.0.0.0/0"
              + core_network_arn           = ""
              + destination_prefix_list_id = ""
              + egress_only_gateway_id     = ""
              + gateway_id                 = (known after apply)
              + instance_id                = ""
              + ipv6_cidr_block            = ""
              + local_gateway_id           = ""
              + nat_gateway_id             = ""
              + network_interface_id       = ""
              + transit_gateway_id         = ""
              + vpc_endpoint_id            = ""
              + vpc_peering_connection_id  = ""
            },
        ]
      + tags             = {
          + "Name" = "pingpong-rt"
        }
      + tags_all         = {
          + "Name" = "pingpong-rt"
        }
      + vpc_id           = (known after apply)
    }

  # aws_route_table_association.pingpong will be created
  + resource "aws_route_table_association" "pingpong" {
      + id             = (known after apply)
      + route_table_id = (known after apply)
      + subnet_id      = (known after apply)
    }

  # aws_security_group.pingpong will be created
  + resource "aws_security_group" "pingpong" {
      + arn                    = (known after apply)
      + description            = "Ping Pong SG"
      + egress                 = [
          + {
              + cidr_blocks      = [
                  + "0.0.0.0/0",
                ]
              + description      = ""
              + from_port        = 0
              + ipv6_cidr_blocks = []
              + prefix_list_ids  = []
              + protocol         = "-1"
              + security_groups  = []
              + self             = false
              + to_port          = 0
            },
        ]
      + id                     = (known after apply)
      + ingress                = [
          + {
              + cidr_blocks      = [
                  + "0.0.0.0/0",
                ]
              + description      = ""
              + from_port        = 22
              + ipv6_cidr_blocks = []
              + prefix_list_ids  = []
              + protocol         = "tcp"
              + security_groups  = []
              + self             = false
              + to_port          = 22
            },
          + {
              + cidr_blocks      = [
                  + "0.0.0.0/0",
                ]
              + description      = ""
              + from_port        = 5432
              + ipv6_cidr_blocks = []
              + prefix_list_ids  = []
              + protocol         = "tcp"
              + security_groups  = []
              + self             = false
              + to_port          = 5432
            },
        ]
      + name                   = "pingpong-sg"
      + name_prefix            = (known after apply)
      + owner_id               = (known after apply)
      + revoke_rules_on_delete = false
      + tags_all               = (known after apply)
      + vpc_id                 = (known after apply)
    }

  # aws_subnet.pingpong will be created
  + resource "aws_subnet" "pingpong" {
      + arn                                            = (known after apply)
      + assign_ipv6_address_on_creation                = false
      + availability_zone                              = (known after apply)
      + availability_zone_id                           = (known after apply)
      + cidr_block                                     = "192.168.10.0/24"
      + enable_dns64                                   = false
      + enable_resource_name_dns_a_record_on_launch    = false
      + enable_resource_name_dns_aaaa_record_on_launch = false
      + id                                             = (known after apply)
      + ipv6_cidr_block_association_id                 = (known after apply)
      + ipv6_native                                    = false
      + map_public_ip_on_launch                        = true
      + owner_id                                       = (known after apply)
      + private_dns_hostname_type_on_launch            = (known after apply)
      + tags                                           = {
          + "Name" = "pingpong-sg"
        }
      + tags_all                                       = {
          + "Name" = "pingpong-sg"
        }
      + vpc_id                                         = (known after apply)
    }

  # aws_vpc.pingpong will be created
  + resource "aws_vpc" "pingpong" {
      + arn                                  = (known after apply)
      + cidr_block                           = "192.168.0.0/16"
      + default_network_acl_id               = (known after apply)
      + default_route_table_id               = (known after apply)
      + default_security_group_id            = (known after apply)
      + dhcp_options_id                      = (known after apply)
      + enable_classiclink                   = (known after apply)
      + enable_classiclink_dns_support       = (known after apply)
      + enable_dns_hostnames                 = (known after apply)
      + enable_dns_support                   = true
      + id                                   = (known after apply)
      + instance_tenancy                     = "default"
      + ipv6_association_id                  = (known after apply)
      + ipv6_cidr_block                      = (known after apply)
      + ipv6_cidr_block_network_border_group = (known after apply)
      + main_route_table_id                  = (known after apply)
      + owner_id                             = (known after apply)
      + tags                                 = {
          + "Name" = "pingpong-vpc"
        }
      + tags_all                             = {
          + "Name" = "pingpong-vpc"
        }
    }

Plan: 8 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + ec2instance = (known after apply)

Do you want to perform these actions?
  Terraform will perform the actions described above.
  Only 'yes' will be accepted to approve.

  Enter a value: yes

aws_key_pair.pingpong: Creating...
aws_vpc.pingpong: Creating...
aws_key_pair.pingpong: Creation complete after 1s [id=terraform-20220423233912555700000001]
aws_vpc.pingpong: Creation complete after 3s [id=vpc-02f0911ca41a24755]
aws_internet_gateway.pingpong: Creating...
aws_subnet.pingpong: Creating...
aws_security_group.pingpong: Creating...
aws_internet_gateway.pingpong: Creation complete after 1s [id=igw-0d64a05a9d892edf3]
aws_route_table.pingpong: Creating...
aws_route_table.pingpong: Creation complete after 2s [id=rtb-0c25e0991550ae390]
aws_security_group.pingpong: Creation complete after 4s [id=sg-0662a80a072c5849d]
aws_subnet.pingpong: Still creating... [10s elapsed]
aws_subnet.pingpong: Creation complete after 12s [id=subnet-0fd77549ec4e033b8]
aws_route_table_association.pingpong: Creating...
aws_instance.pingpong: Creating...
aws_route_table_association.pingpong: Creation complete after 1s [id=rtbassoc-018d70393ee1b15f6]
aws_instance.pingpong: Still creating... [10s elapsed]
aws_instance.pingpong: Still creating... [20s elapsed]
aws_instance.pingpong: Creation complete after 24s [id=i-002aba37856516b30]

Apply complete! Resources: 8 added, 0 changed, 0 destroyed.

Outputs:

ec2instance = "34.201.146.208"
$ pwd
/tmp/pingpong/terraform
$ cd ..
$ cp .env.sample .env

## Change POSTGRES_HOST to the IP address of the instance ###

$ npm install
npm WARN deprecated uuid@3.3.2: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN express-graphql@0.12.0 requires a peer of graphql@^14.7.0 || ^15.3.0 but none is installed. You must install peer dependencies yourself.
npm WARN serverless-offline@8.7.0 requires a peer of serverless@^1.60.0 || 2 || 3 but none is installed. You must install peer dependencies yourself.
npm WARN aws-node-pingpong-api@1.0.0 No repository field.
npm WARN aws-node-pingpong-api@1.0.0 No license field.

added 377 packages from 435 contributors and audited 377 packages in 20.543s

56 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

$ serverless deploy

Deploying aws-node-pingpong-api to stage dev (us-east-1)

✔ Service deployed to stack aws-node-pingpong-api-dev (143s)
endpoint: ANY - https://d5f3gtxjb0.execute-api.us-east-1.amazonaws.com
functions:
  api: aws-node-pingpong-api-dev-api (8.3 MB)

Monitor Express APIs by route with the Serverless Dashboard: run "serverless"
$ 
```
# Destroying
```
$ cd terraform
$ terraform destroy
$ cd ..
$ serverless remove
```
# Debugging
It takes a few seconds to the database to be created, so you may need to wait a bit. Once you are able to ssh to the instance, you can run the following command to check its status:
```bash
tail -f -n1000 /var/log/cloud-init-output.log
```
# Graphql examples
> Ids here are just for reference, yours will be different

```graphql
mutation {
  createUser(name: "Eduardo", email:"eduardobcastro@gmail.com", password:"abcd1234") {
    id
  }
}
```
```graphql
mutation {
  login(email:"eduardobcastro@gmail.com", password:"abcd1234") {
    user {
      id
      email
    }
    token
  }
}
```
```graphql
query {
  players {
    id
    user {
      name
    }
    games {
      id
    }
  }
}
```
The request above is authenticated with the token returned by the login mutation. Add the token to the Authorization header:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJiZjI2MThlLTk4NTctNDYzMC1iYTA3LWZkZGIyNDMxMmYzNCIsImlhdCI6MTY1MDc0NTQ1OX0.6N7Mhub-8E201n_yQJvlAHEI9l9nYD5y4fendWJHe_g"
}
```
```graphql
mutation {
  createGame(players: ["9f7ae159-3f25-46f8-ad68-1f3dc1e08901", "d40104a5-de67-4aaf-b56e-dc1b48c5d440"], scores:[1, 0, 1, 0]) {
    id
  }
}
```
