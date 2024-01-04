import { Octokit } from "@octokit/core";
import { paginateRest } from "@octokit/plugin-paginate-rest";

// const MyOctokit = Octokit.plugin(paginateRest);
// const octokit = new MyOctokit({ auth: "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" });

const token = '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';
const prNumber = 526;
// const prTitle = 'YOUR_PR';

async function getCoAuthors() {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: token });

  try {
    const commitsResponse = await octokit.paginate("GET /repos/{owner}/{repo}/pulls/{pull_number}/commits",{
      owner: "asyncapi",
      repo: "parser-js",
      pull_number: prNumber,
      per_page: 100,
    });

    const authors = commitsResponse.
      map((data: any) => ({
        name: data.commit.author.name,
        email: data.commit.author.email,
        login: data.commit.author.login,
      }))
      .filter((author: any) => author.login !== 'PR_sender_login')
      .reduce((uniqueAuthors: any, author: any) => {
        if (!uniqueAuthors.some((a: any) => a.email === author.email)) {
          uniqueAuthors.push(author);
        }
        console.log(uniqueAuthors);
        
        return uniqueAuthors;
      }, [])
      .map((author: any) => `Co-authored-by: ${author.name} <${author.email}>`)
      .join('\n');

      console.log(authors); 
    return authors;    
  } catch (error) {
    console.error('Error fetching commits:', error);
    return null;
  }
}

// // Merge PR with Co-authored-by lines in commit message
async function automergePR() {
  const coAuthors = await getCoAuthors();
  if (!coAuthors) {
    console.error('No co-authors found.');
    return;
  }

  const commitMessage = `${prTitle} (#${prNumber})\n\n\n${coAuthors}`;
  // Perform merging with the commit message containing Co-authored-by lines
  // Use appropriate logic or GitHub API (octokit.pulls.merge) to merge the PR
}

automergePR();

// const octokit = new MyOctokit({
//   auth: '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'
// })

// https://github.com/asyncapi/parser-js/commit/4799f2a1f5fd538e16f28a0490a06a6fe89caee1

// async function getRepoIssues() {
//   try {
//     const repos: any = await octokit.paginate("GET /repos/{owner}/{repo}/commits/{commit_sha}",{
//       owner: "asyncapi",
//       repo: "parser-js",
//       commit_sha: "4799f2a1f5fd538e16f28a0490a06a6fe89caee1",
//       per_page: 100,
//     });
//     return repos ;
//   } catch (error) {
//     console.error("Error fetching issues:", error);
//     throw error;
//   }
// };

// (async function getCommits() {
//   try {
//     const commits: any = await getRepoIssues();
//     // console.log(commits[0].commit.message);
//     let data = commits[0].commit.message;
//     let formattedData = data.replace(/%0A/g, "\n");
//     console.log(formattedData);
//   } catch (error) {
//     console.error("Error getting commits:", error);
//     throw error;
//   }
// })();

// curl -H "Accept: application/vnd.github+json" -H "Authorization: Bearer ${{ secrets.GH_TOKEN }}" "${{github.event.pull_request._links.commits.href}}?per_page=100"



