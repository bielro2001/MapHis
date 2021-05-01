import React from 'react';
import PropTypes from 'prop-types';
import { formatRelative } from 'date-fns';
import { pt } from 'date-fns/locale';
var resultado = "";
const formatDate = date => {
  let formattedDate = '';
  if (date) {
    // Convert the date in words relative to the current date
    formattedDate = formatRelative(date, new Date(),{locale: pt});
    // Uppercase the first letter
    formattedDate =
      formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }
  return formattedDate;
};

const Message = ({
  createdAt = null,
  text = '',
  displayName = '',
  photoURL = '',
 
}) => {
  if (!text) return null;
  {resultado = text.split(/\s*;\s*/)}
  return (
    <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start">
      {photoURL ? (
        <img
          src={photoURL}
          alt="Avatar"
          className="rounded-full mr-4"
          width={45}
          height={45}
        />
      ) : null}
      <div>
        <div className="flex items-center mb-1">
          {displayName ? (
            <p className="mr-2 text-primary-500">{displayName}</p>
          ) : null}
          {createdAt?.seconds ? (
            <span className="text-gray-500 text-xs">
              {formatDate(new Date(createdAt.seconds * 1000))}
           </span>
          ) : null}
        </div>
      
        <p>{resultado[0]}</p>
        <h1> --</h1>
        <strong>Localização Atual:</strong>
        <p>Latitude: {resultado[1]} </p>
        <p>Longitude: {resultado[2]}  </p>
        <h1> --</h1>
       <font color="blue">
       <p><a href={'https://www.google.com/maps/?q=' +  resultado[1] + resultado[2]} target="_blank" title="Abrir em nova janela">  <b>ABRIR A LOCALIZAÇÃO</b></a></p>
       </font> 
      </div>
   </div>
  );
};

Message.propTypes = {
  text: PropTypes.string,
  createdAt: PropTypes.shape({
    seconds: PropTypes.number,
  }),
  displayName: PropTypes.string,
  photoURL: PropTypes.string,
};

export default Message;
