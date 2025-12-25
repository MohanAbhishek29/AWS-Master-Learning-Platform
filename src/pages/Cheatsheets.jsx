import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Terminal } from 'lucide-react';

const cheatsheets = [
    {
        id: 's3',
        title: 'Amazon S3 CLI',
        color: '#569A31',
        commands: [
            { cmd: 'aws s3 ls', desc: 'List all buckets' },
            { cmd: 'aws s3 cp file.txt s3://bucket', desc: 'Upload a file' },
            { cmd: 'aws s3 sync . s3://bucket', desc: 'Sync current dir to bucket' },
            { cmd: 'aws s3 rb s3://bucket --force', desc: 'Delete a non-empty bucket' },
            { cmd: 'aws s3 presign s3://bucket/file.txt', desc: 'Generate presigned URL' }
        ]
    },
    {
        id: 'ec2',
        title: 'EC2 Basics',
        color: '#FF9900',
        commands: [
            { cmd: 'ssh -i key.pem ec2-user@IP', desc: 'Connect to Linux instance' },
            { cmd: 'aws ec2 describe-instances', desc: 'List instances' },
            { cmd: 'curl http://169.254.169.254/latest/meta-data/', desc: 'Instance Metadata (IMDSv1)' },
            { cmd: 'chmod 400 key.pem', desc: 'Fix key permissions' }
        ]
    },
    {
        id: 'dynamodb',
        title: 'DynamoDB',
        color: '#3B48CC',
        commands: [
            { cmd: 'aws dynamodb list-tables', desc: 'List tables' },
            { cmd: 'aws dynamodb scan --table-name Users', desc: 'Scan entire table' },
            { cmd: 'aws dynamodb get-item ...', desc: 'Read specific item' }
        ]
    },
    {
        id: 'docker',
        title: 'Docker & ECR',
        color: '#00A1C9',
        commands: [
            { cmd: 'aws ecr get-login-password | docker login...', desc: 'Login to ECR' },
            { cmd: 'docker build -t app .', desc: 'Build image' },
            { cmd: 'docker tag app:latest 123.dkr.ecr...', desc: 'Tag image' },
            { cmd: 'docker push 123.dkr.ecr...', desc: 'Push to ECR' }
        ]
    },
    {
        id: 'lambda',
        title: 'AWS Lambda',
        color: '#FF9900',
        commands: [
            { cmd: 'aws lambda list-functions', desc: 'List all functions' },
            { cmd: 'aws lambda invoke --function-name my-func out.json', desc: 'Invoke function' },
            { cmd: 'aws lambda update-function-code ...', desc: 'Deploy code' },
            { cmd: 'sam local start-api', desc: 'Test locally (SAM)' }
        ]
    },
    {
        id: 'vpc',
        title: 'VPC & Networking',
        color: '#8C4FFF',
        commands: [
            { cmd: 'aws ec2 describe-vpcs', desc: 'List VPCs' },
            { cmd: 'aws ec2 describe-subnets', desc: 'List Subnets' },
            { cmd: 'aws ec2 create-security-group ...', desc: 'Create SG' },
            { cmd: 'nslookup my-db.cluster.us-east-1.rds...', desc: 'DNS Debug' }
        ]
    },
    {
        id: 'cloudwatch',
        title: 'CloudWatch Logs',
        color: '#FF0055',
        commands: [
            { cmd: 'aws logs describe-log-groups', desc: 'List log groups' },
            { cmd: 'aws logs get-log-events ...', desc: 'Read logs' },
            { cmd: 'aws cloudwatch get-metric-statistics ...', desc: 'Get CPU metrics' }
        ]
    }
];

export const Cheatsheets = () => {
    return (
        <div className="page-cheatsheets" style={{ paddingTop: '100px', paddingBottom: '80px', minHeight: '100vh' }}>
            <div className="container">

                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '16px' }}>Quick Reference</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Essential commands for your daily cloud workflow.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
                    {cheatsheets.map((sheet) => (
                        <motion.div
                            key={sheet.id}
                            whileHover={{ y: -5 }}
                            className="glass-panel"
                            style={{ padding: '30px', borderRadius: '20px', borderTop: `4px solid ${sheet.color}`, background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <Terminal size={24} color={sheet.color} />
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>{sheet.title}</h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {sheet.commands.map((item, idx) => (
                                    <div key={idx} style={{ background: 'var(--bg-deep)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <code style={{ color: 'var(--text-primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem', fontWeight: 600 }}>{item.cmd}</code>
                                            <Copy size={14} style={{ cursor: 'pointer', opacity: 0.5, color: 'var(--text-secondary)' }} />
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}># {item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};
