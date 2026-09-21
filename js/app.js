"use strict";


/* =========================================================
   DOM REFERENCES
========================================================= */

const activateButton =
    document.getElementById("activateButton");

const confirmationModal =
    document.getElementById("confirmationModal");

const cancelButton =
    document.getElementById("cancelButton");

const confirmButton =
    document.getElementById("confirmButton");

const clearLogButton =
    document.getElementById("clearLogButton");

const eventLog =
    document.getElementById("eventLog");


/* =========================================================
   REGION REFERENCES
========================================================= */

const primaryRegion =
    document.getElementById("primaryRegion");

const backupRegion =
    document.getElementById("backupRegion");

const primaryBadge =
    document.getElementById("primaryBadge");

const backupBadge =
    document.getElementById("backupBadge");


/* =========================================================
   PIPELINE REFERENCES
========================================================= */

const replicationTunnel =
    document.getElementById(
        "replicationTunnel"
    );

const transferTrail =
    document.getElementById(
        "transferTrail"
    );

const transferState =
    document.getElementById(
        "transferState"
    );

const cloudNodeLabel =
    document.getElementById(
        "cloudNodeLabel"
    );


const stepDetect =
    document.getElementById(
        "stepDetect"
    );

const stepReplicate =
    document.getElementById(
        "stepReplicate"
    );

const stepVerify =
    document.getElementById(
        "stepVerify"
    );


/* =========================================================
   STATUS
========================================================= */

const statusHero =
    document.getElementById(
        "statusHero"
    );

const mainStatusIcon =
    document.getElementById(
        "mainStatusIcon"
    );

const mainStatusTitle =
    document.getElementById(
        "mainStatusTitle"
    );

const mainStatusDescription =
    document.getElementById(
        "mainStatusDescription"
    );


/* =========================================================
   RECOVERY RESULT
========================================================= */

const recoverySection =
    document.getElementById(
        "recoverySection"
    );

const resultPanel =
    document.getElementById(
        "resultPanel"
    );

const resultFilename =
    document.getElementById(
        "resultFilename"
    );

const resultDuration =
    document.getElementById(
        "resultDuration"
    );

const resultStatus =
    document.getElementById(
        "resultStatus"
    );


/* =========================================================
   MOBILE NAV
========================================================= */

const mobileNavButtons =
    document.querySelectorAll(
        ".mobile-nav-button"
    );

const mobilePanels =
    document.querySelectorAll(
        ".mobile-panel"
    );


/* =========================================================
   TIMERS
========================================================= */

let stageTimerOne = null;
let stageTimerTwo = null;


/* =========================================================
   MODAL
========================================================= */

function openConfirmationModal() {

    confirmationModal.classList.add(
        "open"
    );

    confirmationModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeConfirmationModal() {

    confirmationModal.classList.remove(
        "open"
    );

    confirmationModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function switchMobilePanel(panelId) {

    mobilePanels.forEach(
        (panel) => {

            panel.classList.remove(
                "active"
            );

        }
    );


    mobileNavButtons.forEach(
        (button) => {

            button.classList.remove(
                "active"
            );

        }
    );


    const target =
        document.getElementById(
            panelId
        );


    const button =
        document.querySelector(
            `[data-panel="${panelId}"]`
        );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    if (button) {

        button.classList.add(
            "active"
        );

    }

}


/* =========================================================
   EVENT LOG
========================================================= */

function addEvent(
    title,
    message,
    type = "success"
) {

    const event =
        document.createElement("div");


    event.className =
        `event-item ${type}`;


    const currentTime =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    const icon =
        type === "error"
            ? "!"
            : "✓";


    event.innerHTML = `
        <div class="event-marker">
            ${icon}
        </div>

        <div class="event-content">

            <strong>
                ${title}
            </strong>

            <p>
                ${message}
            </p>

        </div>

        <time>
            ${currentTime}
        </time>
    `;


    eventLog.prepend(event);

}


/* =========================================================
   TRANSFER STEP HELPERS
========================================================= */

function clearSteps() {

    stepDetect.className =
        "transfer-step";

    stepReplicate.className =
        "transfer-step";

    stepVerify.className =
        "transfer-step";

}


function setDetectStage() {

    clearSteps();


    stepDetect.classList.add(
        "active"
    );


    transferState.textContent =
        "DETECTING";


    cloudNodeLabel.textContent =
        "CHECK";

}


function setReplicateStage() {

    clearSteps();


    stepDetect.classList.add(
        "complete"
    );


    stepReplicate.classList.add(
        "active"
    );


    transferState.textContent =
        "REPLICATING";


    cloudNodeLabel.textContent =
        "SYNC";

}


function setVerifyStage() {

    clearSteps();


    stepDetect.classList.add(
        "complete"
    );


    stepReplicate.classList.add(
        "complete"
    );


    stepVerify.classList.add(
        "active"
    );


    transferState.textContent =
        "VERIFYING";


    cloudNodeLabel.textContent =
        "VERIFY";

}


function setCompleteStage() {

    clearSteps();


    stepDetect.classList.add(
        "complete"
    );


    stepReplicate.classList.add(
        "complete"
    );


    stepVerify.classList.add(
        "complete"
    );


    transferState.textContent =
        "PROTECTED";


    cloudNodeLabel.textContent =
        "✓";

}


/* =========================================================
   TIMERS
========================================================= */

function clearStageTimers() {

    if (stageTimerOne) {

        clearTimeout(
            stageTimerOne
        );

    }


    if (stageTimerTwo) {

        clearTimeout(
            stageTimerTwo
        );

    }


    stageTimerOne = null;
    stageTimerTwo = null;

}


/* =========================================================
   INITIAL / NORMAL STATE
========================================================= */

function resetRecoveryState() {

    clearStageTimers();


    primaryRegion.classList.remove(
        "disaster"
    );


    backupRegion.classList.remove(
        "replicating",
        "protected"
    );


    replicationTunnel.classList.remove(
        "running",
        "success",
        "failed"
    );


    primaryBadge.className =
        "state-badge active";

    primaryBadge.textContent =
        "ACTIVE";


    backupBadge.className =
        "state-badge standby";

    backupBadge.textContent =
        "STANDBY";


    transferState.textContent =
        "READY";


    cloudNodeLabel.textContent =
        "AWS";


    transferTrail.style.width =
        "";

    transferTrail.style.height =
        "";


    clearSteps();


    statusHero.className =
        "status-hero normal";


    mainStatusIcon.textContent =
        "✓";


    mainStatusTitle.textContent =
        "Recovery Infrastructure Ready";


    mainStatusDescription.textContent =
        "Primary and backup regions are ready.";


    resultPanel.classList.add(
        "hidden"
    );

}


/* =========================================================
   RUNNING STATE
========================================================= */

function showRecoveryRunning() {

    resultPanel.classList.add(
        "hidden"
    );


    primaryRegion.classList.add(
        "disaster"
    );


    primaryBadge.className =
        "state-badge critical";

    primaryBadge.textContent =
        "DISASTER";


    backupRegion.classList.remove(
        "protected"
    );


    backupRegion.classList.add(
        "replicating"
    );


    backupBadge.className =
        "state-badge replicating";

    backupBadge.textContent =
        "RECEIVING";


    replicationTunnel.classList.remove(
        "success",
        "failed"
    );


    replicationTunnel.classList.add(
        "running"
    );


    statusHero.className =
        "status-hero danger";


    mainStatusIcon.textContent =
        "!";


    mainStatusTitle.textContent =
        "Recovery In Progress";


    mainStatusDescription.textContent =
        "Critical data is moving to US West.";


    setDetectStage();


    stageTimerOne =
        setTimeout(
            setReplicateStage,
            450
        );


    stageTimerTwo =
        setTimeout(
            setVerifyStage,
            1250
        );

}


/* =========================================================
   SUCCESS STATE
========================================================= */

function showRecoverySuccess(
    result,
    duration
) {

    clearStageTimers();


    replicationTunnel.classList.remove(
        "running",
        "failed"
    );


    replicationTunnel.classList.add(
        "success"
    );


    setCompleteStage();


    primaryBadge.className =
        "state-badge critical";

    primaryBadge.textContent =
        "DEGRADED";


    backupRegion.classList.remove(
        "replicating"
    );


    backupRegion.classList.add(
        "protected"
    );


    backupBadge.className =
        "state-badge protected";

    backupBadge.textContent =
        "PROTECTED";


    statusHero.className =
        "status-hero success";


    mainStatusIcon.textContent =
        "✓";


    mainStatusTitle.textContent =
        "Recovery Completed";


    mainStatusDescription.textContent =
        "Backup data is protected in US West.";


    resultFilename.textContent =
        result.file || "Unknown";


    resultDuration.textContent =
        `${duration.toFixed(0)} ms`;


    resultStatus.textContent =
        "Protected";


    resultPanel.classList.remove(
        "hidden"
    );

}


/* =========================================================
   FAILURE STATE
========================================================= */

function showRecoveryFailure() {

    clearStageTimers();


    replicationTunnel.classList.remove(
        "running",
        "success"
    );


    replicationTunnel.classList.add(
        "failed"
    );


    clearSteps();


    transferState.textContent =
        "FAILED";


    cloudNodeLabel.textContent =
        "!";


    backupRegion.classList.remove(
        "replicating",
        "protected"
    );


    backupBadge.className =
        "state-badge critical";

    backupBadge.textContent =
        "FAILED";


    statusHero.className =
        "status-hero danger";


    mainStatusIcon.textContent =
        "!";


    mainStatusTitle.textContent =
        "Recovery Failed";


    mainStatusDescription.textContent =
        "AWS did not confirm the recovery operation.";


    resultPanel.classList.add(
        "hidden"
    );

}


/* =========================================================
   REAL DISASTER RECOVERY
========================================================= */

async function activateDisasterRecovery() {

    closeConfirmationModal();


    activateButton.disabled =
        true;

    confirmButton.disabled =
        true;

    cancelButton.disabled =
        true;


    const originalButtonHTML =
        activateButton.innerHTML;


    activateButton.innerHTML = `
        <span class="button-icon">
            ↻
        </span>

        <span>

            <strong>
                RECOVERY RUNNING
            </strong>

            <small>
                AWS replication in progress
            </small>

        </span>
    `;


    showRecoveryRunning();


    addEvent(
        "Recovery initiated",
        "Request sent to AWS API Gateway."
    );


    const startTime =
        performance.now();


    try {

        const result =
            await api.activateDisasterRecovery();


        const duration =
            performance.now()
            - startTime;


        showRecoverySuccess(
            result,
            duration
        );


        addEvent(
            "Replication successful",
            `Backup secured: ${result.file}`,
            "success"
        );


        console.log(
            "AWS recovery completed:",
            result
        );

    }


    catch (error) {

        showRecoveryFailure();


        addEvent(
            "Replication failed",
            error.message,
            "error"
        );


        console.error(
            "AWS recovery failed:",
            error
        );

    }


    finally {

        activateButton.disabled =
            false;

        confirmButton.disabled =
            false;

        cancelButton.disabled =
            false;


        activateButton.innerHTML =
            originalButtonHTML;

    }

}


/* =========================================================
   MAIN EVENT LISTENERS
========================================================= */

activateButton.addEventListener(
    "click",
    openConfirmationModal
);


cancelButton.addEventListener(
    "click",
    closeConfirmationModal
);


confirmButton.addEventListener(
    "click",
    activateDisasterRecovery
);


clearLogButton.addEventListener(
    "click",
    () => {

        eventLog.innerHTML =
            "";

    }
);


/* =========================================================
   MOBILE NAV LISTENERS
========================================================= */

mobileNavButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                switchMobilePanel(
                    button.dataset.panel
                );

            }
        );

    }
);


/* =========================================================
   MODAL BACKDROP
========================================================= */

confirmationModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target.classList.contains(
                "modal-backdrop"
            )
        ) {

            closeConfirmationModal();

        }

    }
);


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            !confirmButton.disabled
        ) {

            closeConfirmationModal();

        }

    }
);


/* =========================================================
   INITIALIZE
========================================================= */

resetRecoveryState();


/* =========================================================
   SPLASH SCREEN
========================================================= */

window.addEventListener(
    "load",
    () => {

        window.setTimeout(
            () => {

                const brandSplash =
                    document.getElementById(
                        "brandSplash"
                    );


                if (brandSplash) {

                    brandSplash.classList.add(
                        "hidden"
                    );

                }

            },
            1050
        );

    }
);
