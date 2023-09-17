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

export const academicSemesterFilterableFields = [
  'searchTerm',
  'title',
  'code',
  'year',
]

export const academicSemesterSearchableFields = ['title', 'code', 'year']

export const EVENT_ACADEMIC_SEMESTER_CREATE = 'academic-semester.create'
export const EVENT_ACADEMIC_SEMESTER_UPDATE = 'academic-semester.update'
export const EVENT_ACADEMIC_SEMESTER_DELETE = 'academic-semester.delete'
