import React, { useEffect, useRef } from "react";
import close from "../assets/close.svg";

export default function Dialog({ id, isOpen, dialogContent, closeClick }) {
	const diaRef = useRef(null);

	useEffect(() => {
		const dialog = diaRef.current;
		if (isOpen) {
			dialog.close();
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	function handleClick(e) {
		/* const dialog = diaRef.current;
		let closeBtn = dialog.querySelector(".dialogClose");
		let rect = dialog.getBoundingClientRect();
		let isInDialog =
			rect.top <= e.clientY &&
			e.clientY <= rect.top + rect.height &&
			rect.left <= e.clientX &&
			e.clientX <= rect.left + rect.width;
		if (!isInDialog || e.target === closeBtn) {
			dialog.close();
		} */
	}

	return (
		<>
			<dialog onClick={handleClick} ref={diaRef} id={id}>
				<img
					onClick={closeClick}
					className='dialogClose'
					src={close}
					alt='close'
				/>
				{dialogContent}
			</dialog>
		</>
	);
}
