import {
    SiAmazonec2, SiAmazons3, SiAmazonrds, SiAwslambda, SiAmazondynamodb,
    SiAmazoniam, SiAmazoncloudwatch, SiAmazonroute53, SiAmazoneks
} from 'react-icons/si';

import { FaNetworkWired, FaServer, FaCogs } from 'react-icons/fa';
import {
    Brain, ShieldCheck, Database, Cpu, Settings,
    CloudLightning, Lock, BarChart3, Radio, HardDrive
} from 'lucide-react';

export const paths = [
    {
        id: 'cloud-practitioner',
        title: 'Cloud Practitioner',
        role: 'Beginner',
        description: 'The absolute starting point. Learn the cloud vocabulary and core services.',
        duration: '2-4 Weeks',
        color: '#FF9900',
        steps: [
            { id: 1, title: 'Cloud Concepts', desc: 'What is cloud computing? Capex vs Opex.', icon: SiAmazoncloudwatch },
            { id: 2, title: 'IAM & Security', desc: 'Users, Roles, and Policies.', icon: SiAmazoniam },
            { id: 3, title: 'Compute Basics', desc: 'EC2 Instances and Lambda functions.', icon: SiAmazonec2 },
            { id: 4, title: 'Storage S3', desc: 'Buckets, Objects, and Classes.', icon: SiAmazons3 },
            { id: 5, title: 'Billing', desc: 'Budgets, Cost Explorer, and Support Plans.', icon: SiAmazoncloudwatch },
        ]
    },
    {
        id: 'solutions-architect',
        title: 'Solutions Architect',
        role: 'Architect',
        description: 'Design resilient, high-performing, secure, and cost-optimized architectures.',
        duration: '3-6 Months',
        color: '#00A1C9',
        steps: [
            { id: 1, title: 'VPC Networking', desc: 'Subnets, Route Tables, NAT Gateways.', icon: FaNetworkWired },
            { id: 2, title: 'High Availability', desc: 'Load Balancers (ELB) and Auto Scaling.', icon: SiAmazonec2 },
            { id: 3, title: 'Decoupled Ops', desc: 'SQS, SNS, and EventBridge.', icon: SiAmazoniam },
            { id: 4, title: 'Serverless Arch', desc: 'Lambda + API Gateway patterns.', icon: SiAwslambda },
            { id: 5, title: 'Data Strategy', desc: 'RDS vs DynamoDB vs Redshift.', icon: SiAmazonrds },
            { id: 6, title: 'Caching', desc: 'CloudFront and ElastiCache.', icon: SiAmazonroute53 },
        ]
    },
    {
        id: 'developer',
        title: 'Developer',
        role: 'Developer',
        description: 'Write code and deploy applications on AWS using SDKs and CI/CD.',
        duration: '3-5 Months',
        color: '#8C4FFF',
        steps: [
            { id: 1, title: 'AWS SDK', desc: 'Interacting with services via Python/Node.js.', icon: SiAwslambda },
            { id: 2, title: 'DynamoDB Deep Dive', desc: 'Partitions, Sort Keys, and GSIs.', icon: SiAmazondynamodb },
            { id: 3, title: 'CI/CD ', desc: 'CodeBuild, CodeDeploy, CodePipeline.', icon: FaCogs },
            { id: 4, title: 'Serverless APIs', desc: 'REST & WebSocket APIs with API Gateway.', icon: SiAwslambda },
            { id: 5, title: 'Container Dev', desc: 'Docker on ECS and ECR.', icon: SiAmazoneks },
        ]
    },
    {
        id: 'devops',
        title: 'DevOps Engineer',
        role: 'DevOps',
        description: 'Automate operations, manage infrastructure as code (IaC), and monitor systems.',
        duration: '4-6 Months',
        color: '#3B48CC',
        steps: [
            { id: 1, title: 'IaC with Terraform', desc: 'Provisioning resources with code.', icon: FaServer },
            { id: 2, title: 'Monitoring', desc: 'CloudWatch functionalities, X-Ray.', icon: SiAmazoncloudwatch },
            { id: 3, title: 'Governance', desc: 'AWS Config, Systems Manager.', icon: SiAmazoniam },
            { id: 4, title: 'Container Orchestration', desc: 'EKS (Kubernetes) deep dive.', icon: SiAmazoneks },
            { id: 5, title: 'Incident Response', desc: 'Automating remediation.', icon: SiAmazonroute53 },
        ]
    },
    {
        id: 'ai-ml',
        title: 'AI & Machine Learning',
        role: 'Specialist',
        description: 'Master the art of building, training, and deploying ML models on AWS.',
        duration: '5-8 Months',
        color: '#A855F7',
        steps: [
            { id: 1, title: 'Sagemaker Studio', desc: 'Building Jupyter notebooks and experiments.', icon: Brain },
            { id: 2, title: 'Data Prep', desc: 'AWS Glue and S3 Data Lakes.', icon: Database },
            { id: 3, title: 'Generative AI', desc: 'Exploring Amazon Bedrock and LLMs.', icon: CloudLightning },
            { id: 4, title: 'Model Training', desc: 'Distributed training and hyperparameter tuning.', icon: Cpu },
            { id: 5, title: 'MLOps', desc: 'Deploying models with SageMaker Endpoints.', icon: Settings },
        ]
    },
    {
        id: 'security-specialty',
        title: 'Security Specialist',
        role: 'Security',
        description: 'Secure your cloud infrastructure and protect sensitive data at scale.',
        duration: '4-7 Months',
        color: '#FF4444',
        steps: [
            { id: 1, title: 'Advanced IAM', desc: 'Organizational Units, SCPs, and Permission Boundaries.', icon: Lock },
            { id: 2, title: 'Network Security', desc: 'WAF, Shield, and Network Firewall.', icon: ShieldCheck },
            { id: 3, title: 'Encryption', desc: 'KMS and CloudHSM deep dives.', icon: Lock },
            { id: 4, title: 'Audit & Compliance', desc: 'CloudTrail, Config, and Artifact.', icon: Database },
            { id: 5, title: 'Threat Detection', desc: 'GuardDuty and Security Hub automation.', icon: ShieldCheck },
        ]
    },
    {
        id: 'data-analytics',
        title: 'Data Analytics',
        role: 'Data',
        description: 'Transform raw data into meaningful insights using big data ecosystems.',
        duration: '3-6 Months',
        color: '#4CD964',
        steps: [
            { id: 1, title: 'Data Ingestion', desc: 'Kinesis Streams and Firehose.', icon: CloudLightning },
            { id: 2, title: 'ETL Pipelines', desc: 'AWS Glue and Athena for SQL queries.', icon: Settings },
            { id: 3, title: 'Data Warehousing', desc: 'Amazon Redshift RA3 clusters.', icon: Database },
            { id: 4, title: 'Visualization', desc: 'QuickSight dashboards and reports.', icon: BarChart3 },
            { id: 5, title: 'Batch Processing', desc: 'EMR with Spark and Hadoop.', icon: Database },
        ]
    },
    {
        id: 'iot-specialist',
        title: 'IoT Specialist',
        role: 'IoT',
        description: 'Connect millions of devices and manage data streams in real-time.',
        duration: '3-5 Months',
        color: '#00F0FF',
        steps: [
            { id: 1, title: 'IoT Core', desc: 'MQTT protocols and Device Shadows.', icon: Radio },
            { id: 2, title: 'Edge Computing', desc: 'AWS Greengrass for local compute.', icon: Cpu },
            { id: 3, title: 'Device Mgmt', desc: 'Registering and monitoring fleets.', icon: Settings },
            { id: 4, title: 'IoT Analytics', desc: 'Cleaning and filtering device data.', icon: BarChart3 },
            { id: 5, title: 'Storage & Action', icon: HardDrive, desc: 'Storing telemetry in Timestream.' },
        ]
    },
    {
        id: 'sysops',
        title: 'SysOps Admin',
        role: 'Operations',
        description: 'Manage, scale, and optimize systems on the AWS platform.',
        duration: '3-5 Months',
        color: '#6366F1',
        steps: [
            { id: 1, title: 'Deployment', desc: 'Elastic Beanstalk and CloudFormation.', icon: CloudLightning },
            { id: 2, title: 'Reliability', desc: 'Designing for Failover and Disaster Recovery.', icon: ShieldCheck },
            { id: 3, title: 'Cost Optimization', desc: 'Spot Instances and Savings Plans.', icon: Database },
            { id: 4, title: 'Ops Monitoring', desc: 'Real-time dashboards and alerting.', icon: BarChart3 },
            { id: 5, title: 'Automation', desc: 'SSM Automation and Patch Manager.', icon: Settings },
        ]
    }
];
