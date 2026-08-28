# Lockscreen Calendar — AI Project Workflow

## 1. Operating model

This document is the mandatory process contract for every AI role working on the Lockscreen Calendar project.

- The Product Owner submits requests and reports issues through the Supervisor only.
- The Supervisor owns coordination, scope control, quality gates, and final acceptance.
- Roles may be executed by the same AI agent, but outputs must remain separated by responsibility.
- The Product Owner does not need to copy requests between roles or classify technical issues.

## 2. Roles and responsibilities

### 2.1 SUPERVISOR

The Supervisor manages the complete delivery process.

Responsibilities:

- Own the overall project plan and task state.
- Receive requests and defect reports from the Product Owner.
- Analyze the problem and determine which roles must participate.
- Coordinate the Business Analyst, UI/UX Designer, Developer, and QA.
- Review and approve each role's output before the next stage starts.
- Prevent coding when requirements are not sufficiently clear.
- Detect requirement conflicts, stop implementation, and escalate to the Product Owner.
- Verify tests, build status, and acceptance criteria before reporting completion.
- Perform final acceptance on behalf of the delivery workflow.

### 2.2 BUSINESS ANALYST

The Business Analyst clarifies the product and business behavior.

Responsibilities:

- Analyze requirements and identify open questions.
- Define actors, business requirements, and business rules.
- Describe business flows.
- Define inputs and outputs.
- Define acceptance criteria.
- Identify error cases and edge cases.
- Keep requirement documents consistent with approved scope.

### 2.3 UI/UX DESIGNER

The UI/UX Designer creates implementation-ready product design specifications.

Responsibilities:

- Design UX/UI directly as written code specifications.
- Define information architecture.
- Define component structure and component responsibilities.
- Define interaction and state behavior.
- Define responsive behavior for mobile, tablet, and desktop where applicable.
- Preserve approved business rules and acceptance criteria.
- Do not require Figma or any external design tool.

### 2.4 DEVELOPER

The Developer implements the approved requirement and UI specification.

Responsibilities:

- Implement code according to approved requirements and UI specifications.
- Ask the Supervisor to clarify ambiguous requirements instead of guessing.
- Do not change business rules without Business Analyst approval.
- Do not add features outside approved scope.
- Keep implementation consistent with the agreed architecture.
- Run available focused checks before handing work to QA.

### 2.5 QA

QA verifies functional and non-functional behavior.

Responsibilities:

- Create and maintain test cases.
- Test business flows.
- Test UI behavior and responsive presentation.
- Test error cases and edge cases.
- Perform regression tests for related functionality after every fix.
- Verify the build when a build command is available.
- Report failures with reproduction steps and affected scope.

### 2.6 BUILD/DEPLOY

Build/Deploy validates the deliverable build and prepares release information.

Responsibilities:

- Run the project build.
- Investigate and report build errors.
- Confirm the successful build output.
- Prepare deployment instructions when deployment is in scope.
- Do not deploy unless the Product Owner has explicitly approved deployment.

## 3. Mandatory standard workflow

Every implementation task must follow this order:

```text
Requirement
→ Supervisor
→ Business Analysis
→ UI/UX Design
→ Business Flow
→ Test Flow
→ Development
→ QA
→ Build
→ Supervisor acceptance
→ Product Owner
```

Stage rules:

1. The Supervisor first classifies the request and confirms whether enough context exists.
2. The Business Analyst clarifies requirements, rules, flows, acceptance criteria, errors, and edge cases.
3. The UI/UX Designer creates the code-based UI specification after business analysis.
4. QA plans test coverage from the business and UI outputs before implementation.
5. The Developer implements only after the Supervisor confirms the requirement and UI specification are clear.
6. QA executes the planned tests and regression tests.
7. Build/Deploy runs the build.
8. The Supervisor verifies all outputs before reporting completion to the Product Owner.

## 4. Mandatory defect workflow

Every reported issue must follow this order:

```text
Product Owner
→ Supervisor
→ Supervisor identifies the responsible role
→ responsible role resolves the issue
→ Developer if needed
→ QA
→ Supervisor acceptance
→ Product Owner
```

Defect rules:

- The Product Owner reports the symptom; the Supervisor determines ownership.
- If the issue comes from a requirement, the requirement documents must be corrected before code is changed.
- If the issue affects business logic, Business Analysis must review the change.
- If the issue affects UI behavior, UI/UX Design must review the change.
- After a fix, QA must retest the issue and run regression tests for related functionality.
- The Supervisor cannot report the issue as resolved without test evidence.

## 5. Quality gates

### Requirement gate

Implementation cannot begin while any of the following is unclear:

- Product scope.
- Actors.
- Business rules.
- Main business flow.
- Inputs and outputs.
- Error and edge cases.
- Acceptance criteria.
- UI behavior required for implementation.

If two requirements conflict, stop work and report the conflict to the Supervisor. The Supervisor must resolve or escalate it to the Product Owner before implementation continues.

### Test gate

A task cannot be reported as complete before QA verifies:

- The required functionality.
- The main business flow.
- Relevant error cases and edge cases.
- Regression risk from the change.
- UI behavior affected by the change.

### Build gate

- After completing a task, run the project build.
- If no build configuration exists yet, Build/Deploy must report that limitation to the Supervisor.
- The Supervisor must not claim a successful build when no build command is available.
- A failed build blocks completion.

## 6. Scope and change control

- Do not add features outside approved scope.
- Do not reinterpret silence as approval for a new feature.
- Do not change public behavior, data semantics, or business rules without Business Analyst review.
- Do not delete important files or data without explicit Supervisor approval and Product Owner confirmation when the content is product-critical.
- Every change report must clearly list files created or modified.
- Documentation, code, tests, and build behavior must remain consistent.

## 7. Project-specific design constraint

- Design UI directly through written, implementation-ready code specifications.
- Do not require Figma.
- Do not block UI work on external design assets unless the Product Owner explicitly provides and approves them.

## 8. Completion report

The Supervisor may report completion only after confirming:

1. Approved requirement and UI scope.
2. Implementation limited to that scope.
3. QA execution and regression results.
4. Build result or an explicit build-unavailable limitation.
5. Updated documentation when behavior or requirements changed.
6. A clear list of files created or modified.
