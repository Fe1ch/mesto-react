
const Profile = ({
  userName,
  userDescription,
  userAvatar,
  onEditProfile,
  onAddPlace,
  onEditAvatar
}
) => {

  return (
    <section className="profile">

      <button className="profile__avatar-edit" type="button" aria-label="Изменить аватар профиля" onClick={onEditAvatar}>
        <img className="profile__avatar" src={userAvatar} alt="Аватарка" />
      </button>

      <div className="profile__info">
        <h1 className="profile__title">{userName}</h1>
        <button className="profile__edit-button" type="button" aria-label="Редактировать профиль" onClick={onEditProfile} />
        <p className="profile__subtitle">{userDescription}</p>
      </div>

      <button className="profile__add-button" type="button" onClick={onAddPlace} />
    </section>
  )
}

export default Profile
