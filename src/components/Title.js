import React from 'react'

const TitleComponent = (props) => {
    const {title = ''} = props;
  return (
    <>
    <h2>{title}</h2>
    </>
  )
}

export default TitleComponent