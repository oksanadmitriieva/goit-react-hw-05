import css from './SearchForm.module.css';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

export default function SearchForm({ onSubmit }) {
  const handleFormSearch = event => {
    const notify = () =>
      toast.error('The search field is empty. Please enter a search value', {
        duration: 2000,
        position: 'top-left',
        style: {
          backgroundColor: '#2e2a01',
          color: '#f3b399',
        },
      });
    event.preventDefault();
    const form = event.target;
    const query = form.search.value.trim();
    if (query === '') {
      notify();
    } else {
      onSubmit(query);
    }
    form.reset();
  };
  return (
    <div>
      <Toaster />
      <form className={css.searchForm} onSubmit={handleFormSearch}>
        <input
          className={css.searchInput}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movie"
        />
        <button className={css.btnSearh} type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
