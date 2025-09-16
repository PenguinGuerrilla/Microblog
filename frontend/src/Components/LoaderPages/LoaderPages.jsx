import styles from './LoaderPages.module.css';

export default function LoaderPages()
{
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#d6d6d650]">
            <div className={`${styles.loader}`}></div>
        </div>
    );
}