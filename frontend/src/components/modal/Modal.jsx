import React from 'react';
import './Modal.css';

export default function Modal({ isOpen, onClose, children }) {
    if(!isOpen) return null;

    return (
        <div className='modal-container'>
            <div className='modal-content'>
                    {children}
                    <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}
