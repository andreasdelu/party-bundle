import React, { useEffect, useRef } from "react";
import close from "../assets/close.svg";

export default function Dialog({ id, isOpen, dialogContent, closeClick }) {
	const diaRef = useRef(null);

	/*Åbne og lukke funktion på dialog boksen  */
	useEffect(() => {
		const dialog = diaRef.current;
		if (isOpen) {
			dialog.close();
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	return (
		/* Fremviser åbne og lukke funktionen og printer dialogboksen */
		<>
			<dialog ref={diaRef} id={id}>
				{closeClick && (
					<img
						onClick={closeClick}
						className='dialogClose'
						src={close}
						alt='close'
					/>
				)}
				{dialogContent}
			</dialog>
		</>
	);
}
