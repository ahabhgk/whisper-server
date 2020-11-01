import { Module } from '@nestjs/common';
import { DateScalar } from './scalar/date.scalar';

@Module({
  providers: [DateScalar],
})
export class CommonModule {}
