## How to setup environment and add solver for a new challenge

1. Download the challenge and extract to `challenges` folder, for example, `challenges/Tutorial/...`

2. Update `.env` and `foundry.toml` files for new challenge

3. Add your own `Solve` script in `script` folder

4. Run solver

```bash
forge script Solve --broadcast --with-gas-price=0
```
