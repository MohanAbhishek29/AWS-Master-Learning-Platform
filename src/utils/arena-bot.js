/**
 * Cloud Colosseum - Simulated Opponent AI
 * Name: Cloud_Ninja_99
 * Logic: Progresses through the quiz at a variable rate based on difficulty.
 */

export class ArenaBot {
    constructor(difficulty = 'medium', onProgress) {
        this.difficulty = difficulty;
        this.onProgress = onProgress;
        this.progress = 0; // 0 to 100
        this.score = 0;
        this.isActive = false;
        this.intervalId = null;

        // Settings based on difficulty
        this.tickRate = 1000; // Update every second
        this.minIncrement = 2; // Min % progress per tick
        this.maxIncrement = 5; // Max % progress per tick
        this.mistakeChance = 0.1; // 10% chance to pause (simulate thinking/wrong answer)

        this.configureDifficulty();
    }

    configureDifficulty() {
        switch (this.difficulty) {
            case 'easy':
                this.minIncrement = 1;
                this.maxIncrement = 3;
                this.mistakeChance = 0.2;
                break;
            case 'hard':
                this.minIncrement = 4;
                this.maxIncrement = 8;
                this.mistakeChance = 0.05;
                break;
            case 'god':
                this.minIncrement = 8;
                this.maxIncrement = 15;
                this.mistakeChance = 0.0;
                break;
            default: // medium
                this.minIncrement = 2;
                this.maxIncrement = 5;
                this.mistakeChance = 0.1;
        }
    }

    start() {
        if (this.isActive) return;
        this.isActive = true;
        this.progress = 0;

        this.intervalId = setInterval(() => {
            this.tick();
        }, this.tickRate);
    }

    stop() {
        this.isActive = false;
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    tick() {
        if (!this.isActive) return;

        // Simulate "Thinking" or Mistake
        if (Math.random() < this.mistakeChance) {
            // Bot is confused, no progress this tick
            return;
        }

        // Increment Progress
        const increment = Math.floor(Math.random() * (this.maxIncrement - this.minIncrement + 1)) + this.minIncrement;
        this.progress = Math.min(this.progress + increment, 100);

        // Calculate Score (Pseudo-score based on progress)
        this.score = Math.floor(this.progress * 15); // Approx 1500 max

        // Notify Callback
        if (this.onProgress) {
            this.onProgress({
                progress: this.progress,
                score: this.score,
                status: this.progress >= 100 ? 'finished' : 'racing'
            });
        }

        // Check for Finish
        if (this.progress >= 100) {
            this.stop();
        }
    }
}
