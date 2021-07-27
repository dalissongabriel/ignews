import styles from './styles.module.scss';

type SubscribeButtonProps = {
  princeId: number;
}
export function SubscribeButton({priceId}: SubscribeButtonProps) {
  return (
    <button 
      type="button"
      className={styles.subscribeButton}>
      Subscribe
    </button>
  )
}