export const SoundManager = {
    playSuccess: () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // --- TRUMPET FANFARE (Major Triad: C4, E4, G4, C5) ---
        // Sawtooth wave = brighter, brassy sound
        const notes = [523.25, 659.25, 783.99, 1046.50];

        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now);

            // Brass Envelope (Attack, Decay, Sustain, Release)
            // Punchy attack, slight drop, hold, then fade
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.05); // Attack
            gain.gain.linearRampToValueAtTime(0.15, now + 0.2); // Decay
            gain.gain.setValueAtTime(0.15, now + 0.4); // Sustain
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2); // Release

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 1.2);
        });

        // --- APPLAUSE (Filtered Pink Noise Bursts) ---
        const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate Pink Noise
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            data[i] *= 0.11; // compensate for gain
            b6 = white * 0.115926;
        }

        // Play multiple "claps" randomly to simulate a crowd
        const clapCount = 20;
        for (let i = 0; i < clapCount; i++) {
            const source = ctx.createBufferSource();
            const clapGain = ctx.createGain();
            const filter = ctx.createBiquadFilter();

            source.buffer = buffer;
            // Filter to make it sound more like flesh hitting flesh (muffled high end)
            filter.type = 'lowpass';
            filter.frequency.value = 1200;

            // Randomize start time for "crowd" effect
            const startDelay = 0.1 + (Math.random() * 1.5);

            source.connect(filter);
            filter.connect(clapGain);
            clapGain.connect(ctx.destination);

            // Short envelope for each clap
            clapGain.gain.setValueAtTime(0, now + startDelay);
            clapGain.gain.linearRampToValueAtTime(0.2, now + startDelay + 0.01);
            clapGain.gain.exponentialRampToValueAtTime(0.001, now + startDelay + 0.15);

            source.start(now + startDelay);
            source.stop(now + startDelay + 0.2);
        }
    },

    playFailure: () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // "Womp Womp" - Descending Sawtooth
        const osc1 = ctx.createOscillator();
        const gain1 = ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(200, now);
        osc1.frequency.linearRampToValueAtTime(100, now + 0.5); // Slide down

        gain1.gain.setValueAtTime(0.2, now);
        gain1.gain.linearRampToValueAtTime(0, now + 0.5);

        osc1.connect(gain1);
        gain1.connect(ctx.destination);

        osc1.start(now);
        osc1.stop(now + 0.5);

        // Dissonant interval (Tritone) to make it sound "wrong"
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();

        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(145, now); // ~C#3 (Clash with G3ish)
        osc2.frequency.linearRampToValueAtTime(70, now + 0.5);

        gain2.gain.setValueAtTime(0.2, now);
        gain2.gain.linearRampToValueAtTime(0, now + 0.5);

        osc2.connect(gain2);
        gain2.connect(ctx.destination);

        osc2.start(now);
        osc2.stop(now + 0.5);
    },
    playIntroBuildUp: () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // --- HYPERDRIVE TURBINE ---
        // Two oscillators for a phasing interaction (Flange effect)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc1.type = 'sawtooth';
        osc2.type = 'square';

        // Start low, pitch up aggressively like a jet engine
        osc1.frequency.setValueAtTime(40, now);
        osc1.frequency.exponentialRampToValueAtTime(800, now + 4.0); // 4s Build

        osc2.frequency.setValueAtTime(42, now); // Slight detune
        osc2.frequency.exponentialRampToValueAtTime(810, now + 4.0);

        // Lowpass filter opening up
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, now);
        filter.frequency.exponentialRampToValueAtTime(5000, now + 4.0);

        // Tremolo / Chopper effect (Spinning sensation)
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(5, now);
        lfo.frequency.linearRampToValueAtTime(20, now + 4.0); // Spin speeds up
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = 0.2; // Depth of tremolo

        lfo.connect(lfoGain);
        lfoGain.connect(gain.gain);

        // Master Volume Envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 1);
        gain.gain.linearRampToValueAtTime(0, now + 3.8);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        lfo.start(now);

        osc1.stop(now + 4.0);
        osc2.stop(now + 4.0);
        lfo.stop(now + 4.0);
    },

    playGrandReveal: () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // --- GRAND CHORD (Major Triad: C3, E3, G3, C4) ---
        // Triangle waves for a majestic, smooth horn-like sound
        const frequencies = [130.81, 164.81, 196.00, 261.63];

        frequencies.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle'; // Smoother than sawtooth, grander than sine
            osc.frequency.setValueAtTime(freq, now);

            // Swell envelope: Soft attack, long sustain, slow fade
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 1.0); // Slower swell
            gain.gain.linearRampToValueAtTime(0.2, now + 6.0); // Extended sustain for 7s visual
            gain.gain.exponentialRampToValueAtTime(0.001, now + 10.0); // Long tail fade

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now);
            osc.stop(now + 10.0);
        });

        // --- SUB BASS "BOOM" (Underneath the chord) ---
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(80, now);
        sub.frequency.exponentialRampToValueAtTime(30, now + 3); // Deep drop

        subGain.gain.setValueAtTime(0.6, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 3);

        sub.connect(subGain);
        subGain.connect(ctx.destination);
        sub.start(now);
    },

    playHover: () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // High-tech tiny blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1); // Quick chirp up

        gain.gain.setValueAtTime(0.05, now); // Quiet
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
    },

    playSelect: () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // Confirmation Ping (Glassy)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.05); // Hold briefly
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.3); // Drop

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.02); // Soft attack
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
    },

    // --- AMBIENCE SYSTEM ---
    activeAmbience: null, // Track currently playing nodes

    playSpaceAmbience: () => {
        // Prevent multiple overlaps
        if (SoundManager.activeAmbience) return;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        const now = ctx.currentTime;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(1.2, now + 4.0); // Balanced High Gain
        masterGain.connect(ctx.destination);

        // --- DEEP SPACE VACUUM (Sub-Bass Pink Noise) ---
        // Just the feeling of "pressure" or "empty room tone"
        const bufferSize = ctx.sampleRate * 4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            data[i] *= 0.15; // Raw gain correction
            b6 = white * 0.115926;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(80, now); // <100Hz only (Sub-bass rumble)

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = 1.0;

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noise.start(now);

        // Store reference for stopping
        SoundManager.activeAmbience = { ctx, masterGain, nodes: [noise] };
    },

    stopSpaceAmbience: () => {
        if (!SoundManager.activeAmbience) return;
        const { ctx, masterGain, nodes } = SoundManager.activeAmbience;
        const now = ctx.currentTime;

        // Smooth fade out
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.linearRampToValueAtTime(0, now + 2.0); // 2s Fade out

        setTimeout(() => {
            nodes.forEach(n => n.stop());
            ctx.close();
            SoundManager.activeAmbience = null;
        }, 2100);
    }
};
