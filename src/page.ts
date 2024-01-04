// import { Octokit } from "@octokit/core";
// import { paginateRest, composePaginateRest } from "@octokit/plugin-paginate-rest";

// const MyOctokit = Octokit.plugin(paginateRest);
// const octokit = new MyOctokit({ auth: "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" });

// async function getRepoIssues() {
//   try {
//     const issues = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
//       owner: "octocat",
//       repo: "hello-world",
//       since: "2010-10-01",
//       per_page: 100,
//     });
//     return issues;
//   } catch (error) {
//     console.error("Error fetching issues:", error);
//     throw error;
//   }
// }

// console.log(getRepoIssues());

import { Octokit } from "@octokit/core";
import { paginateRest, composePaginateRest } from "@octokit/plugin-paginate-rest";

// const MyOctokit = Octokit.plugin(paginateRest);
// const octokit = new MyOctokit({ auth: "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" });

// const token = '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';
// const prNumber = 526;
// const prTitle = 'YOUR_PR';

// async function getCoAuthors() {
//   const MyOctokit = Octokit.plugin(paginateRest);
//   const octokit = new MyOctokit({ auth: token });

//   try {
//     const commitsResponse = await octokit.paginate("GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",{
//       owner: "asyncapi",
//       repo: "parser-js",
//       pull_number: prNumber,
//       per_page: 100,
//     });

//     const authors = commitsResponse.data
//       .map((commit: any) => ({
//         name: commit.author.name,
//         email: commit.author.email,
//         login: commit.author.login,
//       }))
//       .filter((author: any) => author.login !== 'PR_sender_login')
//       .reduce((uniqueAuthors: any, author: any) => {
//         if (!uniqueAuthors.some(a => a.email === author.email)) {
//           uniqueAuthors.push(author);
//         }
//         return uniqueAuthors;
//       }, [])
//       .map((author: any) => `Co-authored-by: ${author.name} <${author.email}>`)
//       .join('\n');

//     return authors;
//   } catch (error) {
//     console.error('Error fetching commits:', error);
//     return null;
//   }
// }

// // Merge PR with Co-authored-by lines in commit message
// async function automergePR() {
//   const coAuthors = await getCoAuthors();
//   if (!coAuthors) {
//     console.error('No co-authors found.');
//     return;
//   }

//   const commitMessage = `${prTitle} (#${prNumber})\n\n\n${coAuthors}`;
//   // Perform merging with the commit message containing Co-authored-by lines
//   // Use appropriate logic or GitHub API (octokit.pulls.merge) to merge the PR
// }

// automergePR();

