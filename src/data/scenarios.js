export const scenarios = [
    {
        id: 'crash',
        title: 'The Viral Crash 📉',
        description: 'Your startup just got featured on TechCrunch! Traffic spiked 5000% and the servers crashed. Users are angry.',
        role: 'DevOps Engineer',
        difficulty: 'Medium',
        steps: [
            {
                text: "Boss: 'THE SITE IS DOWN! We have 10,000 users trying to login. The single EC2 instance is at 100% CPU. Fix it!'",
                options: [
                    { label: "Restart the server", outcome: "fail", response: "You restarted it. It crashed again 2 seconds later. Failed." },
                    { label: "Upgrade instance size (Scale Up)", outcome: "neutral", response: "Okay, you bought a massive server. It works, but it's expensive and took 15 mins to setup." },
                    { label: "Create Auto Scaling Group (Scale Out)", outcome: "success", response: "Perfect! You created an Auto Scaling Group behind a Load Balancer. It automatically added 5 servers to handle the load. Site is stable!" }
                ]
            }
        ]
    },
    {
        id: 'cost',
        title: 'The $10,000 Bill 💸',
        description: 'The CFO is screaming. Our AWS bill jumped from $500 to $10,000 this month. Find the leak.',
        role: 'Cloud FinOps',
        difficulty: 'Hard',
        steps: [
            {
                text: "CFO: 'Why are we paying for 50 huge servers that are idle at night?'",
                options: [
                    { label: "Delete the servers at night manually", outcome: "fail", response: "You forgot to turn them back on in the morning. The CEO is mad." },
                    { label: "Use Spot Instances", outcome: "success", response: "Smart! Spot instances are 90% cheaper. You also set up auto-scheduling. Bill dropped to $800." },
                    { label: "Ignore him", outcome: "fail", response: "You got fired." }
                ]
            }
        ]
    },
    {
        id: 'security',
        title: 'The Data Leak 🔓',
        description: 'Twitter is blowing up. Someone found our user database backup makes public on the internet.',
        role: 'SecOps',
        difficulty: 'Critical',
        steps: [
            {
                text: "Security Alert: 'S3 Bucket 'user-backups-2024' is publicly readable.'",
                options: [
                    { label: "Delete the bucket", outcome: "fail", response: "You deleted the only backup! Now we have data loss." },
                    { label: "Enable Block Public Access & MFA Delete", outcome: "success", response: "Crisis averted. You locked the bucket and enabled versioning." },
                    { label: "Change bucket name", outcome: "fail", response: "That doesn't hide the data, and it breaks the app." }
                ]
            }
        ]
    }
];

// --- MASSIVE DATA POOLS FOR PROCEDURAL GENERATION ---

// TEMPLATES for varied description phrasing
const templates = [
    "Alert: The {system} {problem}. Fix it immediately.",
    "Urgent: {system} {problem} during the product launch.",
    "Critical Issue: Monitor shows {system} {problem}.",
    "System Failure: {system} {problem}. Users are impacted.",
    "Warning: {system} {problem}. Performance is degrading."
];

// DevOps: Reliability, Deployments, Infrastructure
const devopsData = {
    systems: [
        "Kubernetes Cluster", "Jenkins Pipeline", "Production EC2 Fleet", "Docker Registry", "Terraform State",
        "Nginx Ingress", "Prometheus Metrics", "ELK Stack", "Lambda Function", "Redis Cache"
    ],
    problems: [
        "failed to deploy", "is stuck in CrashLoopBackOff", "has exhausted IP addresses", "cannot pull image", "drifted from config",
        "is returning 502 Bad Gateway", "is unresponsive", "has 100% CPU usage", "ran out of disk space", "is suffering network partition"
    ],
    solutions: [
        { label: "Rollback to previous version", outcome: "success", response: "Good call. Stability restored first, debugging later." },
        { label: "Force restart everything", outcome: "fail", response: "Downtime increased by 10 minutes. Bad idea." },
        { label: "Check logs & increase timeouts", outcome: "neutral", response: "It worked, but it was slow." },
        { label: "Scale out replicas", outcome: "success", response: "Traffic load balanced. Crisis averted." },
        { label: "Clear cache & restart", outcome: "neutral", response: "Temporary fix, but the issue might return." }
    ]
};

// FinOps: Billing, Cost Optimization, Reservations
const finopsData = {
    systems: [
        "RDS Database", "NAT Gateway", "EBS Snapshots", "Data Transfer", "Lambda Functions",
        "Idle EC2 Instances", "Unattached Volumes", "Load Balancer", "CloudWatch Logs", "DynamoDB Table"
    ],
    problems: [
        "is costing $500/day", "has unattached volumes", "is over-provisioned", "is running on On-Demand", "has infinite recursion loop",
        "has 90% unused capacity", "is storing petabytes of old data", "has no Lifecycle Policy", "is crossing region boundaries", "forgot to be deleted"
    ],
    solutions: [
        { label: "Purchase Savings Plan", outcome: "success", response: "Excellent. You saved 40% immediately." },
        { label: "Turn it off", outcome: "fail", response: "You just broke production. Costs matched revenue (0)." },
        { label: "Rightsizing analysis", outcome: "success", response: "You found we only need t3.medium. Saved $200/mo." },
        { label: "Enable Lifecycle Policy", outcome: "success", response: "Old data moved to Glacier. Saved 80%." },
        { label: "Switch to Graviton instances", outcome: "success", response: "Better performance and 20% cheaper." }
    ]
};

// SecOps: IAM, Network, Compliance
const secopsData = {
    systems: [
        "Root User", "Security Group", "IAM Role", "WAF Rules", "VPC Peering",
        "S3 Bucket", "Route53 DNS", "KMS Key", "Bastion Host", "CloudTrail"
    ],
    problems: [
        "has active access keys", "allows 0.0.0.0/0 SSH", "has Admin privileges", "is blocking legit traffic", "detected anomaly",
        "is public", "has no MFA enabled", "was deleted by accident", "has weak encryption", "logs are missing"
    ],
    solutions: [
        { label: "Rotate Keys & Enforce MFA", outcome: "success", response: "Secure and standard procedure. Good job." },
        { label: "Delete the user", outcome: "fail", response: "That was the CEO's account. Oops." },
        { label: "Whitelisting IP range", outcome: "success", response: "Access restricted to office VPN only. Secure." },
        { label: "Enable GuardDuty", outcome: "success", response: "Threat detection active. We caught the intruder." },
        { label: "Apply Least Privilege Policy", outcome: "success", response: "Permissions locked down. No more risks." }
    ]
};

// Architect: Design, High Availability, Database Choice
const architectData = {
    systems: [
        "User Session Data", "Product Catalog", "Video Processing", "Global Site", "Analytics Warehouse",
        "Payment Gateway", "Search Index", "Chat System", "Inventory DB", "Image Resizer"
    ],
    problems: [
        "needs sub-ms latency", "needs to survive AZ failure", "needs to scale to 1M users", "latency is too high", "queries are slow",
        "is inconsistent", "cannot handle burst traffic", "has single point of failure", "is too expensive", "is hard to maintain"
    ],
    solutions: [
        { label: "Use DynamoDB (NoSQL)", outcome: "success", response: "Perfect for key-value high scale." },
        { label: "Use Single AZ RDS", outcome: "fail", response: "Not HA. If AZ goes down, we go down." },
        { label: "Implement CloudFront CDN", outcome: "success", response: "Cached content globally. Latency solved." },
        { label: "Decouple with SQS", outcome: "success", response: "System is now asynchronous and resilient." },
        { label: "Use Global Tables", outcome: "success", response: "Multi-region active-active replication enabled." }
    ]
};

// Data Engineer: Pipelines, ETL, Big Data
const dataData = {
    systems: [
        "Glue ETL Job", "Redshift Cluster", "Kinesis Stream", "Athena Query", "EMR Cluster",
        "Data Lake", "Kafka Topic", "Airflow DAG", "QuickSight Dashboard", "Spark Job"
    ],
    problems: [
        "failed due to memory", "is stuck in queue", "dropping records", "scanning too much data", "has skew",
        "Schema mismatch", "timed out", "is producing duplicates", "partition key is wrong", "is too slow"
    ],
    solutions: [
        { label: "Switch to G.2X worker type", outcome: "success", response: "More memory fixed the OOM error." },
        { label: "Ignore the data loss", outcome: "fail", response: "Data integrity is ruined. Reports are wrong." },
        { label: "Partition data by date", outcome: "success", response: "Scanning 99% less data now. Fast!" },
        { label: "Use Schema Registry", outcome: "success", response: "Contracts enforced. No more bad data." },
        { label: "Optimize Sort Key", outcome: "success", response: "Queries are 10x faster." }
    ]
};

// ML Engineer: Training, Inference, SageMaker
const mlData = {
    systems: [
        "Training Job", "Inference Endpoint", "Model Accuracy", "SageMaker Studio", "Feature Store",
        "Hyperparameter Tuning", "Ground Truth", "Model Registry", "Notebook Instance", "Data Wrangler"
    ],
    problems: [
        "is costing $50/hour", "latency is 500ms", "dropped below 80%", "instance limit exceeded", "data drift detected",
        "is overfitting", "bias detected", "cold start is too slow", "cannot scale", "is outdated"
    ],
    solutions: [
        { label: "Use Spot Instances for training", outcome: "success", response: "Saved 70% on training costs." },
        { label: "Deploy to AWS Inferentia", outcome: "success", response: "Latency dropped to 50ms. Hardware acceleration works." },
        { label: "Retrain on old data", outcome: "fail", response: "Accuracy got worse. You need fresh data." },
        { label: "Enable Model Monitor", outcome: "success", response: "Drift detected and alerting active." },
        { label: "Use Multi-Model Endpoint", outcome: "success", response: "Hosting 10 models on one instance. efficient." }
    ]
};

const roles = [
    { id: 'devops', role: 'DevOps Engineer', color: '#FF9900', icon: 'cpu', data: devopsData },
    { id: 'finops', role: 'Cloud FinOps', color: '#00FF99', icon: 'dollar', data: finopsData },
    { id: 'secops', role: 'SecOps', color: '#3399FF', icon: 'shield', data: secopsData },
    { id: 'architect', role: 'Solutions Architect', color: '#8C4FFF', icon: 'layer', data: architectData },
    { id: 'data', role: 'Data Engineer', color: '#3B48CC', icon: 'database', data: dataData },
    { id: 'ml', role: 'ML Engineer', color: '#FF0055', icon: 'brain', data: mlData }
];

const difficulties = ['Easy', 'Medium', 'Hard', 'Critical'];

const generateScenarios = () => {
    const generated = [];
    let idCounter = 100;

    roles.forEach(roleObj => {
        const pool = roleObj.data;
        // Generate 35 scenarios for each role
        for (let i = 0; i < 35; i++) {
            const system = pool.systems[Math.floor(Math.random() * pool.systems.length)];
            const problem = pool.problems[Math.floor(Math.random() * pool.problems.length)];

            // Select random template
            const template = templates[Math.floor(Math.random() * templates.length)];
            const description = template.replace('{system}', system).replace('{problem}', problem);

            // Shuffle solutions to randomize order
            const shuffledSolutions = [...pool.solutions].sort(() => Math.random() - 0.5).slice(0, 3);

            generated.push({
                id: `gen-${idCounter++}-${roleObj.id}`,
                title: `${roleObj.role} Mission #${i + 1}`,
                description: description,
                role: roleObj.role,
                difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
                steps: [
                    {
                        text: `Context: The ${system} ${problem} during peak load.`,
                        options: shuffledSolutions
                    }
                ]
            });
        }
    });
    return generated;
};

// Combine manual scenarios with generated ones
export const allScenarios = [...scenarios, ...generateScenarios()];
