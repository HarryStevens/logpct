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

### `logpct(percentage, total?, description?)`

| Parameter     | Type   | Required | Description                                                                |
| ------------- | ------ | -------- | -------------------------------------------------------------------------- |
| `percentage`  | number | yes      | Progress value between 0 and 100.                                          |
| `total`       | number | no       | Total item count. Enables real counts (`375/500`) and speed (`it/s`).      |
| `description` | string | no       | Label prepended to the bar. Can be passed as the second or third argument. |

The second argument is detected by type: a **number** is interpreted as `total`, a **string** as `description`.

### Basic

When `total` and `description` are omitted, the fraction and speed are left out — only the percentage, bar, elapsed time, and ETA are shown.

```js
for (let i = 1; i <= total; i++) {
  await doWork(i);
  logpct((i / total) * 100);
}
```

```
 75%|████████████████████████                        | [00:33<00:10]
```

The progress bar automatically adapts its width to fit your terminal. When `percentage` reaches 100, a newline is printed so subsequent output appears on a fresh line. A new session starts automatically whenever `percentage` drops below the previously logged value.

### With total

```js
import logpct from "logpct";

const total = 500;
for (let i = 1; i <= total; i++) {
  await doWork(i);
  logpct((i / total) * 100, total);
}
```

```
 75%|████████████████████████                | 375/500 [00:33<00:10, 11.36it/s]
```

### With a description

```js
for (let i = 1; i <= total; i++) {
  await doWork(i);
  logpct((i / total) * 100, total, "Downloading");
}
```

```
Downloading:  75%|██████████████████          | 375/500 [00:33<00:10, 11.36it/s]
```

Description may be used with or without total.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
