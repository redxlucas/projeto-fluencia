import React from 'react'

function PhraseBox({ phrase }) {
    return (
        <blockquote style={{ fontStyle: 'italic', margin: '1rem 0' }}>
            {phrase}
        </blockquote>
    );
}

export default PhraseBox;