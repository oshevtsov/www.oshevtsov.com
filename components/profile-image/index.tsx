import styles from './profile-image.module.scss'

interface Props {
  className?: string;
}

const ProfileImageArtDirection = ({ className }: Props) => {
  return (
    <div className={className}>
      <picture>
        <source media={`(max-width: ${styles['mobile-image-max-width']})`} srcSet="/images/oleksii-mobile.webp" />
        <source media={`(min-width: ${styles['desktop-image-min-width']})`} srcSet="/images/oleksii-desktop.webp" />
        <img style={{width: '100%'}} src="/images/oleksii-mobile.png" alt="Oleksii Shevtsov" />
      </picture>
    </div>
  )
}

export default ProfileImageArtDirection;

