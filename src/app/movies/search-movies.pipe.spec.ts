import { SearchMoviesPipe } from './search-movies.pipe';

describe('searchMoviesPipe', () => {
  it('should return new movies list', () => {
    const pipe = new SearchMoviesPipe();
    expect(
      pipe.transform(
        [{ title: 'Test1' }, { title: 'Test2' }, { title: 'Test3' }],
        'Tes',
        'movie'
      )
    ).toEqual([{ title: 'Test1'}, { title: 'Test2' }, { title: 'Test3' }]);
  });
});
