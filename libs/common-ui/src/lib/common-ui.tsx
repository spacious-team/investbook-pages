import styles from './common-ui.module.scss';

/* eslint-disable-next-line */
export interface CommonUiProps {}

export function CommonUi(props: CommonUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CommonUi!</h1>
    </div>
  );
}

export default CommonUi;
