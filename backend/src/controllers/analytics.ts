import { Request, Response } from 'express';
import { prisma } from '../index';

export const getContentAnalytics = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    // Get content
    const content = await prisma.content.findFirst({
      where: {
        id: contentId,
        userId,
      },
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Get analytics
    const analytics = await prisma.analytics.findMany({
      where: {
        userId,
        metrics: {
          path: ['contentId'],
          equals: contentId,
        },
        ...(startDate && endDate && {
          createdAt: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content analytics' });
  }
};

export const getPlatformAnalytics = async (req: Request, res: Response) => {
  try {
    const { platform } = req.params;
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    // Get analytics
    const analytics = await prisma.analytics.findMany({
      where: {
        userId,
        platform,
        ...(startDate && endDate && {
          createdAt: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching platform analytics' });
  }
};

export const getOverallAnalytics = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    // Get analytics
    const analytics = await prisma.analytics.findMany({
      where: {
        userId,
        ...(startDate && endDate && {
          createdAt: {
            gte: new Date(startDate as string),
            lte: new Date(endDate as string),
          },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate overall metrics
    const overallMetrics = analytics.reduce(
      (acc, curr) => {
        const metrics = curr.metrics as any;
        return {
          totalPosts: acc.totalPosts + 1,
          totalEngagements: acc.totalEngagements + (metrics.engagements || 0),
          totalReach: acc.totalReach + (metrics.reach || 0),
          totalImpressions: acc.totalImpressions + (metrics.impressions || 0),
        };
      },
      {
        totalPosts: 0,
        totalEngagements: 0,
        totalReach: 0,
        totalImpressions: 0,
      }
    );

    res.json({
      analytics,
      overallMetrics,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching overall analytics' });
  }
}; 