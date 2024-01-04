// const fetch = require('node-fetch');
// const { Octokit } = require('@octokit/rest');
// const { paginateRest } = require('@octokit/plugin-paginate-rest');
import { Octokit } from '@octokit/rest';
import { paginateRest } from '@octokit/plugin-paginate-rest';

const token = process.env.GITHUB_TOKEN;
const prNumber = process.env.PR_NUMBER;
const repository = process.env.GITHUB_REPOSITORY;

async function getCoAuthors() {
  try {
    const octokit = new Octokit({ auth: token });
    const commitsResponse = await octokit.paginate("GET /repos/{owner}/{repo}/pulls/{pull_number}/commits", {
      owner: "asyncapi",
      repo: repository,
      pull_number: prNumber,
      per_page: 100,
    });

    const authors = commitsResponse
      .map(data => ({
        name: data.commit.author.name,
        email: data.commit.author.email,
        login: data.commit.author.login,
      }))
      .filter(author => author.login !== 'PR_sender_login')
      .reduce((uniqueAuthors, author) => {
        if (!uniqueAuthors.some(a => a.email === author.email)) {
          uniqueAuthors.push(author);
        }
        return uniqueAuthors;
      }, [])
      .map(author => `Co-authored-by: ${author.name} <${author.email}>`)
      .join('\n');
    return authors;
  } catch (error) {
    console.error('Error fetching commits:', error);
    return null;
  }
}