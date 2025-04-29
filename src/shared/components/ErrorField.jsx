import styles from './styles/ErrorsField.module.css'

const ErrorField = ({ message }) => {
    return <span className={styles.error}>{message}</span>
}

export default ErrorField