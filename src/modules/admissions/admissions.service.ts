import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

// Add the following imports:
//import {
//  initialCourses,
//  initialUsers,
//} from '@database/prisma/data/seed-data-initial';
import { admissionProcesses } from '@database/drizzle/schema';
import {
  AdmissionBaseDto,
  AdmissionDto,
  CreateAdmissionDto,
  AdmissionCurrentDto,
} from './dto';

// Add database imports:
//import { PrismaService } from '@database/prisma/prisma.service';
import { DrizzleService } from '@database/drizzle/drizzle.service';
import { eq } from 'drizzle-orm';

@Injectable()
export class AdmissionsService {
  constructor(
    //private readonly prisma: PrismaService,
    private readonly drizzle: DrizzleService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private config: ConfigService,
  ) {}

  // Metodo para crear un nuevo proceso de admisión
  async create(dataCreate: CreateAdmissionDto) {
    dataCreate.name = dataCreate.name.replace(/\s/g, '_').toLowerCase();
    const obj = await this.drizzle.db
      .insert(admissionProcesses)
      .values(dataCreate)
      .returning();
    const admission: AdmissionDto[] = plainToInstance(AdmissionDto, obj);

    const cacheKey = this.config.get<string>(
      'CACHE_KEYS.ALL_ADMISSION',
    ) as string;
    await this.cacheManager.del(cacheKey);

    const currentKey = this.config.get<string>(
      'CACHE_KEYS.CURRENT_ADMISSION',
    ) as string;
    await this.cacheManager.set(currentKey, {
      name: admission[0].name,
      year: admission[0].year,
    });

    return admission;
  }

  // Metodo para obtener el proceso de admisión actual
  async getCurrent(): Promise<AdmissionCurrentDto> {
    // Obtener el proceso de admisión actual desde cache
    const currentKey = this.config.get<string>(
      'CACHE_KEYS.CURRENT_ADMISSION',
    ) as string;
    const current = await this.cacheManager.get(currentKey);
    if (current) return current as AdmissionCurrentDto;

    // Obtener el proceso de admisión actual desde la base de datos
    const obj = await this.drizzle.db.query.admissionProcesses.findFirst({
      columns: {
        name: true,
        year: true,
      },
      where: eq(admissionProcesses.isCurrent, true),
    });

    // Si no hay proceso de admisión actual, retornar el core schema
    if (!obj) {
      const coreSchema = this.config.get<string>('CORE_SCHEMA') as string;
      return { name: coreSchema, year: 0 };
    }

    // Guardar el proceso de admisión actual en cache
    await this.cacheManager.set(currentKey, obj);
    return obj;
  }

  // Metodo para obtener todos los procesos de admisión usando cache sin current
  async getAllWithCache(): Promise<AdmissionCurrentDto[]> {
    const cacheKey = this.config.get<string>(
      'CACHE_KEYS.ALL_ADMISSION',
    ) as string;

    // Obtener la clave de cache
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) return cachedData as AdmissionCurrentDto[];

    // Obtener los datos de la base de datos en caso de no estar en cache
    const data = await this.drizzle.db.query.admissionProcesses.findMany({
      columns: {
        name: true,
        year: true,
      },
      where: eq(admissionProcesses.isCurrent, false),
    });

    // Guardar los datos en cache
    await this.cacheManager.set(cacheKey, data);
    return data;
  }

  // Metodo para obtener todos los procesos de admisión con sus observaciones
  async getAllRelations() {
    const obj = await this.drizzle.db.query.admissionProcesses.findMany({
      with: {
        observations: {
          columns: {
            description: true,
          },
        },
      },
    });
    return obj.map((item) =>
      plainToInstance(AdmissionBaseDto, item, {
        excludePrefixes: ['id', 'description', 'isCurrent', 'createdAt'],
      }),
    );
  }

  // Metodo para obtener un proceso de admisión por nombre con sus observaciones
  async getOneWithObservations(name: string) {
    const obj = await this.drizzle.db.query.admissionProcesses.findFirst({
      where: eq(admissionProcesses.name, name),
      with: {
        observations: {
          columns: {
            description: true,
            createdAt: true,
          },
        },
      },
    });
    return plainToInstance(AdmissionBaseDto, obj);
  }

  // Metodo para realizar una migracion
  async runMigrationSchema(dataCreate: CreateAdmissionDto) {
    const obj = await this.create(dataCreate);
    console.log(obj);
    // añadir logica del esquema
    //await this.seedInitialData();
  }
  /*private async seedInitialData() {
    return await this.prisma.$transaction([
      this.prisma.course.createMany({
        data: initialCourses,
      }),
      this.prisma.user.createMany({
        data: initialUsers,
      }),
    ]);
  }*/
}
