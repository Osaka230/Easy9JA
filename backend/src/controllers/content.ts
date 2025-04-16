import { Request, Response } from 'express';
import { prisma } from '../index';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, body, scheduleDate } = req.body;
    const userId = req.user.id;

    const content = await prisma.content.create({
      data: {
        title,
        body,
        scheduleDate: scheduleDate ? new Date(scheduleDate) : null,
        userId,
      },
    });

    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error creating content' });
  }
};

export const getContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const content = await prisma.content.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content' });
  }
};

export const listContent = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { status, page = 1, limit = 10 } = req.query;

    const where = {
      userId,
      ...(status && { status }),
    };

    const [content, total] = await Promise.all([
      prisma.content.findMany({
        where,
        skip: (Number(page) - 1) * Number(limit),
        take: Number(limit),
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.content.count({ where }),
    ]);

    res.json({
      content,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error listing content' });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, body, status, scheduleDate } = req.body;

    const content = await prisma.content.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    const updatedContent = await prisma.content.update({
      where: { id },
      data: {
        title,
        body,
        status,
        scheduleDate: scheduleDate ? new Date(scheduleDate) : null,
      },
    });

    res.json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating content' });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const content = await prisma.content.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    await prisma.content.delete({
      where: { id },
    });

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content' });
  }
};

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { prompt, tone, length, platform } = req.body;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a content creator. Generate content based on the following parameters:
          - Tone: ${tone || 'professional'}
          - Length: ${length || 'medium'}
          - Platform: ${platform || 'general'}
          `,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-3.5-turbo',
    });

    const generatedContent = completion.choices[0].message.content;

    res.json({
      content: generatedContent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating content' });
  }
}; 