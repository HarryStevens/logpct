# logpct

A tqdm-style progress bar for Node.js.

## Installation

```bash
npm i logpct
```

> **Note:** logpct is ESM-only and requires Node 18+.

## Usage

```js
import logpct from "logpct";
```

### `logpct(percentage, description?)`

| Parameter     | Type   | Required | Description                               |
| ------------- | ------ | -------- | ----------------------------------------- |
| `percentage`  | number | yes      | Progress value between 0 and 100.         |
| `description` | string | no       | Label prepended to the bar when provided. |

### Basic

```js
import logpct from "logpct";

const total = 500;
for (let i = 1; i <= total; i++) {
  await doWork(i);
  logpct((i / total) * 100);
}
```

```
 76%|████████████████████████                | 456/500 [00:33<00:10, 2.30%/s]
```

### With a description

```js
for (let i = 1; i <= total; i++) {
  await doWork(i);
  logpct((i / total) * 100, "Downloading");
}
```

```
Downloading:  76%|██████████████████          | 456/500 [00:33<00:10, 2.30%/s]
```

The progress bar automatically adapts its width to fit your terminal. When `percentage` reaches 100, a newline is printed so subsequent output appears on a fresh line. A new session starts automatically whenever `percentage` drops below the previously logged value.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
