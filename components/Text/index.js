import styles from './index.module.scss';
export const Title = ({ children, style = {} }) => (
   <h1 style={style} className={styles.title}>
      {children}
   </h1>
);

export const SectionTitle = ({ children, style = {} }) => (
   <h2 style={style} className={styles['section-title']}>
      {children}
   </h2>
);

export const Paragraph = ({ children, style = {} }) => (
   <p style={style} className={styles.paragraph}>
      {children}
   </p>
);
