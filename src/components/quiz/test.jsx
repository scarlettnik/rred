import { useState } from 'react';

const Test = () => {
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const data = {
      qwerty: 1,
      asdf: 2,
      zxcv: 3,
      vbnm: 4,
    };

    try {
      const response = await fetch('https://kruase.serveo.net/wordcloud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const imageData = await response.blob();
        const imageUrl = URL.createObjectURL(imageData);
        setImage(imageUrl);
      } else {
        console.log('POST request failed');
      }
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Отправить POST-запрос</button>
      {image ? (
        <img src={image} alt="Received Image" />
      ) : (
        <p>Нажмите кнопку для отправки POST-запроса</p>
      )}
    </div>
  );
};

export default Test;