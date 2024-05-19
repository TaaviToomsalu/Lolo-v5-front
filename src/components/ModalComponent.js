import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import LoadingSpinner from './LoadingSpinner'; 
import './ModalStyles.css'; 

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, content }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsModalOpen(true);
            setIsLoading(true);
        } else {
            setIsModalOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (content) {
            setIsLoading(false);
        }
    }, [content]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={onRequestClose}
            contentLabel="Article Content"
            className="modal"
            overlayClassName="overlay"
        >
            <button className="close-button" onClick={onRequestClose}>Close</button>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="modal-content" dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </Modal>
    );
};

export default ModalComponent;
