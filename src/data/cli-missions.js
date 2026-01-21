export const cliMissions = [
    // --- ORIGINAL MISSIONS ---
    {
        id: 1,
        title: "SECURITY AUDIT",
        desc: "System breach imminent! Quickly list all S3 buckets to check for data leaks.",
        cmd: "aws s3 ls",
        hint: "Type 'aws s3 ls' to list buckets",
        time: 10
    },
    {
        id: 2,
        title: "SERVER STATUS",
        desc: "EC2 Cluster is unresponsive. Get the description of all instances now!",
        cmd: "aws ec2 describe-instances",
        hint: "Use 'describe-instances'",
        time: 15
    },
    {
        id: 3,
        title: "ACCESS CONTROL",
        desc: "Unauthorized access detected. Create a new IAM user 'security-bot' to lock it down.",
        cmd: "aws iam create-user --user-name security-bot",
        hint: "create-user --user-name ...",
        time: 20
    },
    {
        id: 4,
        title: "STORAGE RESCUE",
        desc: "CRITICAL: Database corrupted. Create a backup bucket named 'emergency-save'.",
        cmd: "aws s3 mb s3://emergency-save",
        hint: "Use 'mb' (make bucket) command",
        time: 15
    },
    {
        id: 5,
        title: "NETWORK DEFENSE",
        desc: "DDoS Attack! Reboot the firewall instance 'i-firewall-01' immediately.",
        cmd: "aws ec2 reboot-instances --instance-ids i-firewall-01",
        hint: "reboot-instances --instance-ids ...",
        time: 25
    },
    // --- NEW MISSIONS (Batch 1: Compute & Storage) ---
    {
        id: 6,
        title: "INSTANCE LAUNCH",
        desc: "We need more power! Run a new t2.micro instance with image 'ami-12345678'.",
        cmd: "aws ec2 run-instances --image-id ami-12345678 --instance-type t2.micro",
        hint: "run-instances --image-id ... --instance-type ...",
        time: 25
    },
    {
        id: 7,
        title: "VOLUME ATTACH",
        desc: "Storage full! Attach volume 'vol-049df61146c4d7901' to instance 'i-1234567890abcdef0'.",
        cmd: "aws ec2 attach-volume --volume-id vol-049df61146c4d7901 --instance-id i-1234567890abcdef0 --device /dev/sdf",
        hint: "attach-volume --volume-id ... --instance-id ... --device ...",
        time: 25
    },
    {
        id: 8,
        title: "S3 DOWNLOAD",
        desc: "Retrieving payload... Copy 'secret-plans.txt' from 's3://covert-ops' to local folder.",
        cmd: "aws s3 cp s3://covert-ops/secret-plans.txt .",
        hint: "cp s3://... .",
        time: 20
    },
    {
        id: 9,
        title: "BUCKET DELETE",
        desc: "Evidence cleanup required. Delete the bucket 's3://compromised-data' immediately.",
        cmd: "aws s3 rb s3://compromised-data",
        hint: "Use 'rb' (remove bucket) command",
        time: 15
    },
    {
        id: 10,
        title: "START INSTANCE",
        desc: "Mainframe offline. Start the instance 'i-0123456789abcdef0' to restore services.",
        cmd: "aws ec2 start-instances --instance-ids i-0123456789abcdef0",
        hint: "start-instances --instance-ids ...",
        time: 20
    },
    {
        id: 11,
        title: "STOP INSTANCE",
        desc: "Overheating detected! Stop instance 'i-0123456789abcdef0' to prevent meltdown.",
        cmd: "aws ec2 stop-instances --instance-ids i-0123456789abcdef0",
        hint: "stop-instances --instance-ids ...",
        time: 20
    },
    {
        id: 12,
        title: "KEY PAIR CREATE",
        desc: "New admin incoming. Create a key pair named 'admin-key' and query the key material.",
        cmd: "aws ec2 create-key-pair --key-name admin-key",
        hint: "create-key-pair --key-name ...",
        time: 20
    },
    {
        id: 13,
        title: "SECURITY GRP",
        desc: "Lock the doors. Create a security group 'sg-web-access' with description 'Allow Web'.",
        cmd: "aws ec2 create-security-group --group-name sg-web-access --description \"Allow Web\"",
        hint: "create-security-group --group-name ... --description ...",
        time: 25
    },
    {
        id: 14,
        title: "S3 SYNC",
        desc: "Backup required. Sync local folder 'logs' to 's3://archive-logs'.",
        cmd: "aws s3 sync logs s3://archive-logs",
        hint: "sync source destination",
        time: 15
    },
    {
        id: 15,
        title: "SNAPSHOT CREATE",
        desc: "Preserve the state. Create a snapshot of volume 'vol-1234567890abcdef0'.",
        cmd: "aws ec2 create-snapshot --volume-id vol-1234567890abcdef0 --description \"Emergency Backup\"",
        hint: "create-snapshot --volume-id ... --description ...",
        time: 25
    },

    // --- NEW MISSIONS (Batch 2: IAM & Security) ---
    {
        id: 16,
        title: "PASSWORD POLICY",
        desc: "Enforce security! Update the account password policy to require symbols.",
        cmd: "aws iam update-account-password-policy --require-symbols",
        hint: "update-account-password-policy --require-symbols",
        time: 25
    },
    {
        id: 17,
        title: "USER GROUP",
        desc: "Team expansion. Create a new IAM group named 'Developers'.",
        cmd: "aws iam create-group --group-name Developers",
        hint: "create-group --group-name ...",
        time: 15
    },
    {
        id: 18,
        title: "ADD TO GROUP",
        desc: "Onboarding new recruit. Add user 'alice' to group 'Developers'.",
        cmd: "aws iam add-user-to-group --user-name alice --group-name Developers",
        hint: "add-user-to-group --user-name ... --group-name ...",
        time: 20
    },
    {
        id: 19,
        title: "ACCESS KEY",
        desc: "Credential rotation. Create a new access key for user 'bob'.",
        cmd: "aws iam create-access-key --user-name bob",
        hint: "create-access-key --user-name ...",
        time: 15
    },
    {
        id: 20,
        title: "ROLE CREATION",
        desc: "Service autonomy. Create a role named 'LambdaExec' with assumed policy document.",
        cmd: "aws iam create-role --role-name LambdaExec --assume-role-policy-document file://trust.json",
        hint: "create-role --role-name ... --assume-role-policy-document ...",
        time: 25
    },

    // --- NEW MISSIONS (Batch 3: Lambda & Serverless) ---
    {
        id: 21,
        title: "LIST FUNCTIONS",
        desc: "Audit the codebase. List all Lambda functions in the region.",
        cmd: "aws lambda list-functions",
        hint: "list-functions",
        time: 10
    },
    {
        id: 22,
        title: "INVOKE FUNCTION",
        desc: "Trigger the payload. Invoke the function 'ProcessData' with output file 'out.txt'.",
        cmd: "aws lambda invoke --function-name ProcessData out.txt",
        hint: "invoke --function-name ... output_file",
        time: 20
    },
    {
        id: 23,
        title: "DYNAMO TABLE",
        desc: "Data silo needed. Create a DynamoDB table 'Users' with key 'UserId'.",
        cmd: "aws dynamodb create-table --table-name Users --attribute-definitions AttributeName=UserId,AttributeType=S --key-schema AttributeName=UserId,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5",
        hint: "create-table --table-name ... (Use shorthand logic if accepted or type full command)",
        time: 25
    },
    {
        id: 24,
        title: "DYNAMO LIST",
        desc: "Check the inventory. List all DynamoDB tables.",
        cmd: "aws dynamodb list-tables",
        hint: "list-tables",
        time: 10
    },
    {
        id: 25,
        title: "DYNAMO ITEM",
        desc: "Inject data. Put an item into table 'Users' (json syntax required).",
        cmd: "aws dynamodb put-item --table-name Users --item file://item.json",
        hint: "put-item --table-name ... --item ...",
        time: 20
    },

    // --- NEW MISSIONS (Batch 4: Networking & VPC) ---
    {
        id: 26,
        title: "CREATE VPC",
        desc: "New territory. Create a VPC with CIDR 10.0.0.0/16.",
        cmd: "aws ec2 create-vpc --cidr-block 10.0.0.0/16",
        hint: "create-vpc --cidr-block ...",
        time: 20
    },
    {
        id: 27,
        title: "CREATE SUBNET",
        desc: "Divide and conquer. Create a subnet in VPC 'vpc-123' with CIDR 10.0.1.0/24.",
        cmd: "aws ec2 create-subnet --vpc-id vpc-123 --cidr-block 10.0.1.0/24",
        hint: "create-subnet --vpc-id ... --cidr-block ...",
        time: 25
    },
    {
        id: 28,
        title: "IGW CREATE",
        desc: "Open the gates. Create an Internet Gateway.",
        cmd: "aws ec2 create-internet-gateway",
        hint: "create-internet-gateway",
        time: 15
    },
    {
        id: 29,
        title: "ATTACH IGW",
        desc: "Connect to the world. Attach IGW 'igw-123' to VPC 'vpc-123'.",
        cmd: "aws ec2 attach-internet-gateway --internet-gateway-id igw-123 --vpc-id vpc-123",
        hint: "attach-internet-gateway ... --vpc-id ...",
        time: 25
    },
    {
        id: 30,
        title: "ROUTE TABLE",
        desc: "Map the path. Create a route table for VPC 'vpc-123'.",
        cmd: "aws ec2 create-route-table --vpc-id vpc-123",
        hint: "create-route-table --vpc-id ...",
        time: 20
    },

    // --- NEW MISSIONS (Batch 5: Advanced & Misc) ---
    {
        id: 31,
        title: "CLOUDWATCH ALARM",
        desc: "Set the tripwire. Describe alarms with prefix 'HighCPU'.",
        cmd: "aws cloudwatch describe-alarms --alarm-name-prefix HighCPU",
        hint: "describe-alarms --alarm-name-prefix ...",
        time: 20
    },
    {
        id: 32,
        title: "SNS TOPIC",
        desc: "Broadcast channel. Create an SNS topic named 'Alerts'.",
        cmd: "aws sns create-topic --name Alerts",
        hint: "create-topic --name ...",
        time: 15
    },
    {
        id: 33,
        title: "SQS QUEUE",
        desc: "Buffer overload. Create an SQS queue named 'JobQueue'.",
        cmd: "aws sqs create-queue --queue-name JobQueue",
        hint: "create-queue --queue-name ...",
        time: 15
    },
    {
        id: 34,
        title: "EKS CLUSTER",
        desc: "Container orchestration. List all EKS clusters.",
        cmd: "aws eks list-clusters",
        hint: "list-clusters",
        time: 10
    },
    {
        id: 35,
        title: "RDS INSTANCE",
        desc: "Database status. Describe DB instance 'mydb'.",
        cmd: "aws rds describe-db-instances --db-instance-identifier mydb",
        hint: "describe-db-instances --db-instance-identifier ...",
        time: 20
    },
    {
        id: 36,
        title: "CLOUDTRAIL",
        desc: "Who did that? Describe local trails.",
        cmd: "aws cloudtrail describe-trails",
        hint: "describe-trails",
        time: 10
    },
    {
        id: 37,
        title: "ECR REPO",
        desc: "Docker home. Create an ECR repository named 'my-app'.",
        cmd: "aws ecr create-repository --repository-name my-app",
        hint: "create-repository --repository-name ...",
        time: 20
    },
    {
        id: 38,
        title: "SECRET GET",
        desc: "Retrieve the codes. Get secret value for 'prod/db'.",
        cmd: "aws secretsmanager get-secret-value --secret-id prod/db",
        hint: "get-secret-value --secret-id ...",
        time: 20
    },
    {
        id: 39,
        title: "ORG ACCOUNT",
        desc: "Expansion mode. List accounts in the organization.",
        cmd: "aws organizations list-accounts",
        hint: "list-accounts",
        time: 10
    },
    {
        id: 40,
        title: "COST FORECAST",
        desc: "Money matters. Get cost forecast.",
        cmd: "aws ce get-cost-forecast --time-period Start=2023-01-01,End=2023-12-31 --metric UNBLENDED_COST --granularity MONTHLY",
        hint: "ce get-cost-forecast (simplified)",
        time: 25
    },
    {
        id: 41,
        title: "STS CALLER",
        desc: "Who am I? Get the caller identity.",
        cmd: "aws sts get-caller-identity",
        hint: "get-caller-identity",
        time: 10
    },
    {
        id: 42,
        title: "ROUTE53 ZONES",
        desc: "DNS lookup. List hosted zones.",
        cmd: "aws route53 list-hosted-zones",
        hint: "list-hosted-zones",
        time: 15
    },
    {
        id: 43,
        title: "ELB LOADBALANCER",
        desc: "Traffic control. Describe load balancers.",
        cmd: "aws elbv2 describe-load-balancers",
        hint: "describe-load-balancers",
        time: 15
    },
    {
        id: 44,
        title: "AUTO SCALING",
        desc: "Elasticity check. Describe auto scaling groups.",
        cmd: "aws autoscaling describe-auto-scaling-groups",
        hint: "describe-auto-scaling-groups",
        time: 20
    },
    {
        id: 45,
        title: "KINESIS STREAM",
        desc: "Data flow. List Kinesis streams.",
        cmd: "aws kinesis list-streams",
        hint: "list-streams",
        time: 10
    },
    {
        id: 46,
        title: "GLUE JOB",
        desc: "ETL magic. List Glue jobs.",
        cmd: "aws glue list-jobs",
        hint: "list-jobs",
        time: 10
    },
    {
        id: 47,
        title: "REDSHIFT CLUSTER",
        desc: "Data warehouse. Describe Redshift clusters.",
        cmd: "aws redshift describe-clusters",
        hint: "describe-clusters",
        time: 15
    },
    {
        id: 48,
        title: "CF STACK",
        desc: "Infrastructure as Code. Describe CloudFormation stacks.",
        cmd: "aws cloudformation describe-stacks",
        hint: "describe-stacks",
        time: 15
    },
    {
        id: 49,
        title: "SSM PARAM",
        desc: "Config store. Get parameter ' /my/app/config'.",
        cmd: "aws ssm get-parameter --name /my/app/config",
        hint: "get-parameter --name ...",
        time: 15
    },
    {
        id: 50,
        title: "WAF ACL",
        desc: "Shields up. List Web ACLs.",
        cmd: "aws wafv2 list-web-acls --scope REGIONAL",
        hint: "list-web-acls --scope ...",
        time: 20
    },
    {
        id: 51,
        title: "CONFIG RULE",
        desc: "Compliance check. Describe Config rules.",
        cmd: "aws configservice describe-config-rules",
        hint: "describe-config-rules",
        time: 15
    }
];
