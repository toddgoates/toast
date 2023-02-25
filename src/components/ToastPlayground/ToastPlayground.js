import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [toasts, setToasts] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [variant, setVariant] = React.useState("notice");

  function createToast(event) {
    event.preventDefault();

    setToasts([
      ...toasts,
      {
        id: crypto.randomUUID(),
        message,
        variant,
        isVisible: true,
      },
    ]);

    setMessage("");
    setVariant("notice");
  }

  function deleteToast(id) {
    const toastIndex = toasts.findIndex((toast) => {
      return toast.id === id;
    });

    const newToasts = [...toasts];
    newToasts.splice(toastIndex, 1);

    setToasts(newToasts);
  }

  return (
    <form className={styles.wrapper} onSubmit={createToast}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} deleteToast={deleteToast} />

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              required
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label htmlFor={`variant-${option}`} key={option}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={variant === option}
                  onChange={(event) => setVariant(event.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ToastPlayground;
