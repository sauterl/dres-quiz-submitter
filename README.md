# Dres Quiz Submitter

This is a simple frontend that serves as a quiz answer submitter for [DRES](https://github.com/dres-dev/DRES).

Even though DRES is by no means a quiz orchestrating tool, it can be (ab)used as such.

## Submitter Setup

The submitter has to be set up, such that the server configuration points to a running DRES instance (the API).
_The default port of the DRES API is 8080, so for a locally set up server this would be `http://localhost:8080`_

## DRES Setup

This very simple frontend serves as the quiz answer submission buttons A,B,C,D.
Without modification of the code, the submitter sends `a`, `b`, `c`, `d` as the answer to DRES.
Thus, in order for it to work, a DRES evaluation template has to be set up such that the accepted answer
is one of these values.

The intended setup for the task type in DRES is as follows (the task type can be added to DRES as preset [quiz-task-type](resources/quiz-task-type.json) ):
* Duration: 60s
* Target: TEXT
* Scoring: KIS
* Components: TEXT, EXTERNAL_IMAGE
* Submission Options: NO_DUPLICATES, LIMIT_CORRECT_PER_TEAM, TEXTUAL_SUBMISSION
* Task Options: HIDDEN_RESULTS
* Parameters:
  * LIMIT_CORRECT_PER_TEAM, limit, 1
  * KIS, maxPointsPerTask, 190 (`max`)
  * KIS, maxPointsAtTaskEnd, 10 (`min`)
  * KIS, penaltyPerWrongSubmission, 200 (`penalty`)

For reasons later described, `max` is to be set such that
maximally awarded points `m = min + (max - min) * T`.
Where `T` is the offset (as a fraction between 0 and 1) of the reading time.
Following this setup, `T=0.5` and `m=100`, then `max=190`.
In order to discourage brute force, the `penalty` is to be set higher than `max`,
which results in sending the wrong answer will result 0 points.

Task groups can either be created per category or a single one for the entire quiz.

Teams: Ideally one user per team (no judges or team groups necessary).

Tasks: Depending on the handling of team groups (i.e. one for the entire quiz or in categories),
each task is then created such that the correct answer is one of `a`,`b`,`c`,`d`.
With the duration of 60s per task, the design is such that the first 30 seconds (hence `T=0.5`)
are for quiz question only, the latter 30s should also show the answer possibilities.
In order to get them displayed somewhat layouted, it is encouraged to use an image (externally created).

Example task:
* Name: q-1
* Collection (_is not affected, leave as is_)
* Duration: 60s (_leave default_)
* Targets:
  * d
* Query descriptions:
  * start:0, end: _blank_, (text) "What does DRES stand for?"
  * start:30, end: _blank_, (external image) q-1.png

External image `q-1.png` then might contain a setup as follows:

```
A: Distributed Retrieval Evaluation System | B: Decentralised Retrieval Evaluation Server
-----------------------------------------------------------------------------------------
C: Distributed Response Evaluation System  | D: Distributed Retrieval Evaluation Server
```
Note that this submitter frontend display A,B,C,D as in the order above.

The 30s of the external image query description will cause the 
image to be displayed after 30 seconds, which is in our setup half of the time, hence `T=0.5`

Note, for complex setups, it might be worthwhile to have several task types with different timing,
then the corresponding parameters have to be set accordingly.

## Quiz Operations

The quiz is started like any other evaluation with DRES.
The details of the scoring and the distinction between "reading time" (the first 30s)
and solving time (the second 30s). This is simply because in the first 30 seconds,
the participants wouldn't know what to submit.

Participants can either log-in in a separate tab to the DRES frontend or using the login of this project.
Additionally, a dedicated viewer for the tasks (e.g. a projector) will greatly enhance the experience.

This submitter frontend is built such that it automatically submits to the first ongoing evaluation of a user
and would enable users to submit early.

Also, a good practice is to have a dry-run that does not contribute to the score (i.e. with a dedicated task type for this occasion).

---
### Note

This targets the [`dev` branch](https://github.com/dres-dev/DRES/tree/dev) of DRES!

---

# Developer  Instructions

This project uses yarn as package manager and does depend on locally built bindings with openapi.
Thus, after cloning issue the following:

1. `yarn`
2. `yarn run gen-dres-client-dev` (or omit the `-dev` suffix if DRES v2 is released)

Other than that, see the angular instructions below.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
