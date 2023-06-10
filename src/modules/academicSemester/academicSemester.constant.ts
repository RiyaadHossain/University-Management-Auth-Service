import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './academicSemester.interface'

export const academicSemesterTitles: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
]

export const academicSemesterCodes: IAcademicSemesterCode[] = ['01', '02', '03']

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitleCodeMap: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const paginationFields = ['page', 'limit', 'sortBy', 'sortOrder']
export const filterFields = ['searchTerm', 'title', 'code', 'year']
export const academicSemesterSearchableFields = ['title', 'code', 'year']
