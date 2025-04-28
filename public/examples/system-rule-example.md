**RULE: BrainGarden CLI - \`.brain\` Folder Integrity Reminder**

WE ARE USING THE BRAIN GARDEN SYSTEM TO BUILD THE BRAIN GARDEN SYSTEM.

The root \`.brain\` folder is CRITICAL for BrainGarden, storing project state, history, and metadata.

**Precautions:**

* **NO Direct Manipulation:** The CLI code MUST avoid direct file system changes within \`.brain\` except via intentional CLI commands.
* **Confirmation for Destructive Actions:** Any command modifying \`.brain\` data MUST require explicit user confirmation.
* **Atomic Operations:** Updates to \`.brain\` should be atomic to prevent data corruption.
* **Avoid Manual Edits:** Users and developers MUST NOT manually modify or delete \`.brain\` contents.
* **Sandboxed Testing:** Test CLI changes affecting \`.brain\` in isolated environments.

**Risks of Damage:** Loss of project state, history, metadata, CLI malfunction, and potential data recovery issues.

**Protection:** Use a dedicated CLI internal API for \`.brain\` interaction. Consider CLI-based backup mechanisms.

**Importance:** Preserving \`.brain\` data maintains project history, enables auditing, and supports collaboration and troubleshooting. Treat this folder with extreme care. 