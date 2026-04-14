import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("my-bucket");

const ownershipControls = new aws.s3.BucketOwnershipControls("ownershipControls", {
    bucket: bucket.id,
    rule: {
        objectOwnership: "BucketOwnerPreferred",
    },
});

const publicAccessBlock = new aws.s3.BucketPublicAccessBlock("publicAccessBlock", {
    bucket: bucket.id,
    blockPublicAcls: false,
});

const website = new aws.s3.BucketWebsiteConfiguration("website", {
    bucket: bucket.id,
    indexDocument: {
      suffix: "index.html",
    },
});

// Create an S3 Bucket Object
const bucketObject = new aws.s3.BucketObject("index.html", {
    bucket: bucket.id,
    source: new pulumi.asset.FileAsset("./index.html"),
    contentType: "text/html",
    acl: "public-read",
}, { dependsOn: [ownershipControls, publicAccessBlock, website] });

// Export the name of the bucket
export const bucketName = bucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${website.websiteEndpoint}`;

