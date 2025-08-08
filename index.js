#!/usr/bin/env node

import axios from "axios";
// import clipboardy from "clipboardy";

async function getAWSCredentials() {
  try {
    const { data: credentials } = await axios.get(
      process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI,
      {
        headers: {
          Authorization: process.env.AWS_CONTAINER_AUTHORIZATION_TOKEN,
        },
      }
    );

    const variablesToExport = {
      AWS_DEFAULT_REGION: process.env.AWS_DEFAULT_REGION,
      AWS_ACCESS_KEY_ID: credentials.AccessKeyId,
      AWS_SECRET_ACCESS_KEY: credentials.SecretAccessKey,
      AWS_SESSION_TOKEN: credentials.Token,
    };

    const exportString = Object.keys(variablesToExport)
      .reduce(
        (acc, current) => [
          ...acc,
          `export ${current}=${variablesToExport[current]}`,
        ],
        []
      )
      .join("; ");

    console.log(exportString);

    // clipboardy.writeSync(exportString);
  } catch (error) {
    console.error("Error fetching AWS credentials:", error.message);
  }
}

getAWSCredentials();
