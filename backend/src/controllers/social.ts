import { Request, Response } from 'express';
import { prisma } from '../index';
import Twit from 'twit';

export const connectAccount = async (req: Request, res: Response) => {
  try {
    const { platform, accessToken, refreshToken } = req.body;
    const userId = req.user.id;

    // Check if account already exists
    const existingAccount = await prisma.socialAccount.findFirst({
      where: {
        userId,
        platform,
      },
    });

    if (existingAccount) {
      return res.status(400).json({ message: 'Account already connected' });
    }

    // Create social account
    const account = await prisma.socialAccount.create({
      data: {
        platform,
        accessToken,
        refreshToken,
        userId,
      },
    });

    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ message: 'Error connecting account' });
  }
};

export const disconnectAccount = async (req: Request, res: Response) => {
  try {
    const { platform } = req.params;
    const userId = req.user.id;

    const account = await prisma.socialAccount.findFirst({
      where: {
        userId,
        platform,
      },
    });

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await prisma.socialAccount.delete({
      where: { id: account.id },
    });

    res.json({ message: 'Account disconnected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error disconnecting account' });
  }
};

export const listAccounts = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const accounts = await prisma.socialAccount.findMany({
      where: { userId },
    });

    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Error listing accounts' });
  }
};

export const postContent = async (req: Request, res: Response) => {
  try {
    const { platform, contentId } = req.body;
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

    // Get social account
    const account = await prisma.socialAccount.findFirst({
      where: {
        userId,
        platform,
      },
    });

    if (!account) {
      return res.status(404).json({ message: 'Social account not found' });
    }

    // Post to social media
    switch (platform) {
      case 'twitter':
        await postToTwitter(account, content);
        break;
      case 'facebook':
        await postToFacebook(account, content);
        break;
      case 'instagram':
        await postToInstagram(account, content);
        break;
      default:
        return res.status(400).json({ message: 'Unsupported platform' });
    }

    // Update content status
    await prisma.content.update({
      where: { id: contentId },
      data: { status: 'published' },
    });

    res.json({ message: 'Content posted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error posting content' });
  }
};

export const schedulePost = async (req: Request, res: Response) => {
  try {
    const { platform, contentId, scheduleDate } = req.body;
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

    // Get social account
    const account = await prisma.socialAccount.findFirst({
      where: {
        userId,
        platform,
      },
    });

    if (!account) {
      return res.status(404).json({ message: 'Social account not found' });
    }

    // Update content schedule
    await prisma.content.update({
      where: { id: contentId },
      data: {
        status: 'scheduled',
        scheduleDate: new Date(scheduleDate),
      },
    });

    res.json({ message: 'Post scheduled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling post' });
  }
};

// Helper functions for posting to social media platforms
const postToTwitter = async (account: any, content: any) => {
  const twitter = new Twit({
    consumer_key: process.env.TWITTER_API_KEY!,
    consumer_secret: process.env.TWITTER_API_SECRET!,
    access_token: account.accessToken,
    access_token_secret: account.refreshToken,
  });

  await twitter.post('statuses/update', { status: content.body });
};

const postToFacebook = async (account: any, content: any) => {
  // Implement Facebook posting logic
  // This would use the Facebook Graph API
};

const postToInstagram = async (account: any, content: any) => {
  // Implement Instagram posting logic
  // This would use the Instagram Graph API
}; 