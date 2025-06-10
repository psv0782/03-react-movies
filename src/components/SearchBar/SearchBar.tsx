import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';
import {type FormEvent, useRef} from "react";

export interface SearchBarProps {
    onSubmit: (query: string) => void;
}

export default function SearchBar({onSubmit}: SearchBarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query = inputRef.current?.value.trim() || '';
        if (!query) {
            toast.error('Please enter your search query.');
            return;
        }

        onSubmit(query);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <a
                    className={styles.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by TMDB
                </a>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                        ref={inputRef}
                    />
                    <button className={styles.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>
    );
};