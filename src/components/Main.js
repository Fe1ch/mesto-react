import { useEffect, useState } from 'react';
import { api } from '../utils.js/api';
import Card from './Card';
import Profile from './Profile';
const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick
}) => {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setInitialCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfoProfile(), api.getInitialsCards()])
      .then(([data, cards]) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        setInitialCards(cards)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <main className='content'>
      <Profile
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        onEditProfile={onEditProfile}
        onAddPlace={onAddPlace}
        onEditAvatar={onEditAvatar}
      />

      <section className="elements">
        <ul className="elements__container">
          {
            cards.map((card) =>
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
              />
            )
          }
        </ul>
      </section>
    </main>
  )
}
export default Main