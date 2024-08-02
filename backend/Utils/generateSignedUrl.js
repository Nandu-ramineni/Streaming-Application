import { cloudFront } from '../awsConfig.js';
import AWS from 'aws-sdk';
const generateSignedUrl = (fileName) => {
    const params = {
        DistributionId: process.env.CLOUDFRONT_DISTRIBUTION_ID,
        Expires: Math.floor((Date.now() + 60 * 60 * 1000) / 1000), // 1 hour expiration
        Items: [`/videos/${fileName}`]
    };

    return cloudFront.getSignedUrl(params);
};

export default generateSignedUrl;
