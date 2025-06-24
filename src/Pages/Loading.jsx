import styles from "../Styles/Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles._loader_box}>
      <div className={styles.loader}></div>
    </div>
  );
};
