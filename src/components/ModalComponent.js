// ModalComponent.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import LoadingSpinner from './LoadingSpinner'; // Import the loading spinner component
import './ModalStyles.css'; // Import the CSS file for modal styles

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, content }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // Separate state for modal opening

    useEffect(() => {
        if (isOpen) {
            setIsModalOpen(true); // Open modal immediately when isOpen is true
            setIsLoading(true); // Set loading state to true when modal is opened
        } else {
            setIsModalOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        // Set loading state based on content
        if (content) {
            setIsLoading(false);
        }
    }, [content]);

    useEffect(() => {
        // Add/remove style to body when modal is open/closed
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            // Cleanup style on unmount
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpen]);

    return (
        <Modal
            isOpen={isModalOpen} // Use isModalOpen instead of isOpen
            onRequestClose={onRequestClose}
            contentLabel="Article Content"
            className="modal" // Apply a class name for the modal
            overlayClassName="overlay" // Apply a class name for the overlay
        >
            <button className="close-button" onClick={onRequestClose}>Close</button>
            {isLoading ? (
                <LoadingSpinner /> // Show loading spinner if content is loading
            ) : (
                <div className="modal-content" dangerouslySetInnerHTML={{ __html: content }} />
            )}
        </Modal>
    );
};

export default ModalComponent;
