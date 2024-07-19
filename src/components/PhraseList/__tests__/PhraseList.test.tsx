import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';
import PhraseListComponent from '../PhraseList';
import { usePhrase } from '../../../hooks/usePhrase';

jest.mock('../../../hooks/usePhrase', () => ({
    usePhrase: jest.fn(),
}));
jest.mock('../../Spinner/Spinner', () => () => <div>Loading...</div>);
jest.mock('../../Filter/Filter', () => () => <div>Filter Component</div>);
jest.mock('../../PhraseListItem/PhraseListItemComponent', () => ({ phrase }: { phrase: any }) => <div>{phrase.title}</div>);
jest.mock('react-virtuoso', () => ({
    Virtuoso: ({ totalCount, itemContent }: { totalCount: number, itemContent: (index: number) => JSX.Element }) => (
      <div>
        {Array.from({ length: totalCount }, (_, index) => itemContent(index))}
      </div>
    ),
}));

describe('PhraseListComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render "Lista de frases" title', () => {
        (usePhrase as jest.Mock).mockReturnValue({ state: { phrasesList: [], filter: '', }, isEmpty: true, loading: false });
        render(<PhraseListComponent />);
        expect(screen.getByText('Lista de frases')).toBeInTheDocument();
    });

    it('should render "Todavía no agregaste ninguna frase" when there are no phrases and isEmpty is true', () => {
        (usePhrase as jest.Mock).mockReturnValue({ state: { phrasesList: [], filter: '' }, isEmpty: true, loading: false });
        render(<PhraseListComponent />);
        expect(screen.getByText('Todavía no agregaste ninguna frase')).toBeInTheDocument();
    });

    it('should render "No hay resultados" when there are no results after filtering', () => {
        (usePhrase as jest.Mock).mockReturnValue({
            state: { phrasesList: [{ id: '1', title: 'Test phrase' }], filter: 'non-existent' },
            isEmpty: false,
            loading: false
        });
        render(<PhraseListComponent />);
        expect(screen.getByText('No hay resultados')).toBeInTheDocument();
    });

    it('should render Spinner when loading is true', () => {
        (usePhrase as jest.Mock).mockReturnValue({ state: { phrasesList: [], filter: '' }, isEmpty: false, loading: true });
        render(<PhraseListComponent />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should render filtered phrases in Virtuoso when loading is false and there are phrases', async () => {
        (usePhrase as jest.Mock).mockReturnValue({
            state: {
            phrasesList: [
                { id: '1', title: 'Test phrase 1' },
                { id: '2', title: 'Test phrase 2' },
            ],
            filter: 'Test phrase',
            },
            isEmpty: false,
            loading: false
        });
        render(<PhraseListComponent />);

        expect(screen.getByText('Test phrase 1')).toBeInTheDocument();
        expect(screen.getByText('Test phrase 2')).toBeInTheDocument();
    });
});