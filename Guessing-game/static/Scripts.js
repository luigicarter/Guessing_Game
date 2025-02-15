document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.floating-question-marks');
    const questionMarks = [];

    function createQuestionMark() {
        const questionMark = document.createElement('span');
        questionMark.innerHTML = '?';
        questionMark.className = 'floating-question-mark';

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const speedX = 0.2 + Math.random() * 0.3;
        const speedY = 0.2 + Math.random() * 0.3;
        const directionX = Math.random() < 0.5 ? 1 : -1;
        const directionY = Math.random() < 0.5 ? 1 : -1;

        questionMark.style.left = startX + 'px';
        questionMark.style.top = startY + 'px';

        container.appendChild(questionMark);
        questionMarks.push({ element: questionMark, startX, startY, speedX, speedY, directionX, directionY });
    }

    function moveQuestionMarks() {
        for (const mark of questionMarks) {
            mark.startX += mark.speedX * mark.directionX;
            mark.startY += mark.speedY * mark.directionY;

            if (mark.startX > window.innerWidth - mark.element.offsetWidth) {
                mark.startX = window.innerWidth - mark.element.offsetWidth;
                mark.directionX *= -1;
            } else if (mark.startX < 0) {
                mark.startX = 0;
                mark.directionX *= -1;
            }

            if (mark.startY > window.innerHeight - mark.element.offsetHeight) {
                mark.startY = window.innerHeight - mark.element.offsetHeight;
                mark.directionY *= -1;
            } else if (mark.startY < 0) {
                mark.startY = 0;
                mark.directionY *= -1;
            }

            mark.element.style.left = mark.startX + 'px';
            mark.element.style.top = mark.startY + 'px';
        }

        requestAnimationFrame(moveQuestionMarks);
    }

    // Create initial question marks
    for (let i = 0; i < 75; i++) {
        createQuestionMark();
    }

    // Start animation
    moveQuestionMarks();
});
