import { Button, Modal, ModalBody } from "flowbite-react";

export default function DeleteMessageModal({
    openModal,
    setOpenModal,
    onClick,
}: {
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
    onClick: () => void;
}) {
    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="md">
            <ModalBody>
                <h4 className="font-semibold text-lg text-center text-pretty text-white">
                    Are you sure you want to delete this message?
                </h4>
                <div className="flex justify-center gap-3 mt-3">
                    <Button
                        onClick={() => setOpenModal(false)}
                        color="gray"
                        className="w-24"
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={onClick}
                        color="red"
                        className="w-24 focus:outline-none"
                    >
                        Delete
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}
