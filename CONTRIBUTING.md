# Contributing
If you're using the SDK and you find a missing feature or a bug, 
please contribute your fixes back to us!

## How to get started

### Fork the repository, clone it and get it ready for development:
```
git clone git@github.com:YOUR-USERNAME/gettyimages-api_nodejs.git
cd gettyimages-api_nodejs
git submodule update --init
npm install
```

### Run the tests!
Before you change anything, run the tests. They *should* all pass
as we don't commit to master with failing tests, but hey, you never
know!
```
npm test
```
This will also show you where we're at with code coverage.

We use [CucumberJS](https://github.com/cucumber/cucumber-js) for 
testing. You may want to familiarize yourself with 
[Gherkin](https://github.com/cucumber/cucumber/wiki/Gherkin) and 
[BDD](https://en.wikipedia.org/wiki/Behavior-driven_development)
if you haven't used them before. 

Ideally, if you add completely new functionality, you would write your
scenarios (tests) first. Since the scenarios are in a separate git
repository (included as a git submodule), you'd need to fork and clone 
that repository as well.
```
git clone git@github.com:YOUR-USERNAME/gettyimages-api_bdd.git
```
This allows us to use the same scenarios across all the implementations
of our SDKs.

### Increase the Chances of Your Pull Request Being Accepted
Before [submitting a pull request](https://help.github.com/articles/creating-a-pull-request/)
, here's a few tips:
+ Follow our coding style. The linter is your friend here.
+ Write tests. If you've added new behavior, we'll need a scenario
to cover it.
+ Run the tests! If the tests are all passing, you'll save yourself
the step of fixing them after you've submitted the pull requests
and the automated build fails.
+ Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)

```
npm test
npm run lint
```
If the tests pass and the linter returns no errors, your pull request 
will be ***much*** more likely to be accepted.






